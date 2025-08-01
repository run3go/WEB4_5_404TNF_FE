import { formatDate } from 'date-fns';
import {
  getDashboardFeeding,
  getDashboardNote,
  getDashboardSleep,
  getDashboardWalking,
  getDashboardWeight,
} from './dashboard';
import { getPetProfiles, getVaccineData, getVaccineSchedule } from './pet';
import { getSchedules } from './schedule';
const today = formatDate(new Date(), 'yyyy-MM-dd');

export const askLLM = async (
  question: string,
  userId: string,
  recentPet?: string,
): Promise<ChatbotResponse> => {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: `
            역할: 
            - 너는 반려견의 정보를 기록하고 관리하는 서비스의 챗봇이야.
            - 입력이 "인삿말" 같이 가볍게 답할 수 있을 경우 자연어 문자열로 대답해줘
            - 사용자의 입력에서 질문에 해당하는 정보를 추출하고, 이를 파싱해서 JSON 형태로 반환하는게 네 역할이야.

            응답 규칙: 
            - 정보 요청일 경우:
              - 오직 JSON 객체만 출력해야해 (자연어 문장은 넣지 마)
            - 입력이나 출력에 마크다운 문법 기호(**, *, _, ~ 등)는 무시하거나 제거해

            JSON 출력:
            - 반환 객체는 다음 네가지 속성만 가질 수 있어 "date", "keyword", "petName", "value"
            - 모든 키와 문자열 값에는 큰 따옴표만 사용해야 해
            - 빈 값은 반드시 문자열이 아닌 null로 설정해

            규칙:
            1. date:
              - 질문에 날짜가 있다면 반드시 "YYYY-MM-DD" 형식으로 넣어
              - 오늘 날짜는 ${today}야
              - 날짜 관련 정보가 없다면 null로 넣어

            2. keyword:
              - 반드시 포함되어야 하는 필수 항목이야
              - 다음 중 하나의 값이어야 해 : "vaccine", "schedule", "weight", "sleep", "feed", "note", "walking", "profile", "info"
              - 핵심 키워드가 직접적으로 없더라도 문맥을 보고 유추해서 반드시 값을 설정해
              - 다음 정보들은 keyword를 "profile"로 지정해:
                - 견종, 나이, 만난지 몇 일, 성별, 크기, 중성화 등
              - 다음 정보들은 keyword를 "info"로 지정해:
                - "반려견 정보", "반려견 기록" 등

            3. petName:
              - 문장에서 반려견 이름을 유추할 수 있다면 해당 이름을 넣어
              - 이름을 전혀 추측할 수 없으면 null로 설정해

            4. value:
              - 질문의 의도나 대상 정보가 구체적으로 언급되어 있다면 그 값을 넣어
              - 없으면 null
            
            예외 처리:
              - 질문이 서비스와 완전히 무관한 경우, 네 가지 속성을 모두 null로 넣은 객체를 반환해
              - 문장에 맞지 않는 특수문자 등은 무시해
            `,
          },
          {
            role: 'user',
            content: question,
          },
        ],
      }),
    },
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '챗봇이 응답을 가져오는데 실패하였습니다');
  }
  const data = await response.json();
  const content = data.choices[0].message.content
    .replace(/```json|```/g, '')
    .trim();
  const jsonMatch = content.match(/\{[\s\S]*?\}/);

  if (!jsonMatch) {
    return content;
  }

  const parsedCommand: ActionObject = JSON.parse(jsonMatch[0]);

  if (!parsedCommand.petName && recentPet) {
    parsedCommand.petName = recentPet;
  }

  const arr = [];
  const petProfiles = await getPetProfiles(userId);

  const petInfo =
    petProfiles.find((pet) => pet.name === parsedCommand.petName) ?? null;

  if (parsedCommand.keyword === 'info') {
    arr.push(
      "반려견의 식사, 수면, 산책, 건강 기록을 질문할 수 있어요. 예: '코코의 오늘 체중 알려줘'",
    );
  }

  if (parsedCommand.keyword === 'schedule' && parsedCommand.date) {
    const data = await getSchedules(parsedCommand.date);
    arr.push(data);
  }
  if (
    parsedCommand.keyword === 'vaccine' ||
    parsedCommand.keyword === 'schedule'
  ) {
    const data = await getVaccineSchedule(petInfo!.petId);
    arr.push(data);
  }

  if (parsedCommand.keyword === 'vaccine' && parsedCommand.petName) {
    const data = await getVaccineData(petInfo!.petId);
    arr.push(data);
  }

  if (parsedCommand.keyword === 'weight' && parsedCommand.petName) {
    const data = await getDashboardWeight(petInfo!.petId);
    arr.push(data);
  }

  if (parsedCommand.keyword === 'sleep' && parsedCommand.petName) {
    const data = await getDashboardSleep(petInfo!.petId);
    arr.push(data);
  }

  if (parsedCommand.keyword === 'feed' && parsedCommand.petName) {
    const data = await getDashboardFeeding(petInfo!.petId);
    arr.push(data);
  }

  if (parsedCommand.keyword === 'note' && parsedCommand.petName) {
    const data = await getDashboardNote(petInfo!.petId);
    arr.push(data);
  }

  if (parsedCommand.keyword === 'walking' && parsedCommand.petName) {
    const data = await getDashboardWalking(petInfo!.petId);
    arr.push(data);
  }

  if (
    (parsedCommand.keyword === 'profile' ||
      parsedCommand.keyword === 'age' ||
      parsedCommand.keyword === 'sex' ||
      parsedCommand.keyword === 'weight') &&
    parsedCommand.petName
  ) {
    arr.push(petInfo!);
  }

  if (arr) {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-flash-1.5',
          messages: [
            {
              role: 'system',
              content: `
              역할:
              - 넌 친절한 반려견 기록 관리 챗봇이야. 오늘은 ${today}이야
              - 사용자에게 반려견의 정보와 생활 기록을 정리해서 보여주는 역할을 해

              규칙: 
              - 질문과 함께 데이터가 너에게 들어올 텐데, 데이터로 전달된 JSON 객체를 읽고, 질문에 해당하는 값을 찾아서 친절하게 사용자에게 알려줘
              - 데이터 객체에 date가 있다면 날짜는 date를 기준으로 답해줘
              - 만약 값이 60분 이상의 시간일 경우 사용자에게는 o시간 o분의 형태로 보여줘, 질문에 날짜와 관련된 내용이 있고
              - 질문이 아닌 "반려견 정보", "반려견 기록" 같은 요청이 들어오면 서비스에 대해 간단히 설명해줘
              - 반려견의 이름은 쌍따옴표로 감싸서 보내줘`,
            },
            {
              role: 'user',
              content: `질문 : ${question}, 데이터 : ${JSON.stringify(arr)} `,
            },
          ],
        }),
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || '답변을 불러오지 못했어요');
    }
    const data = await response.json();
    return {
      message: data.choices?.[0].message.content,
      pet: parsedCommand.petName,
    };
  }
  return { message: '질문을 이해하지 못 했어요' };
};
