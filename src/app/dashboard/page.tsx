import FeedCard from '@/components/dashboard/FeedCard';
import LineGraphCard from '@/components/dashboard/LineGraphCard';
import NoteCard from '@/components/dashboard/NoteCard';
import ProfileCard from '@/components/dashboard/ProfileCard';
import TodoCard from '@/components/dashboard/TodoCard';
import WalkCard from '@/components/dashboard/WalkCard';

import speechBubble from '@/assets/images/speech-bubble.png';
import Button from '@/components/common/Button';
import Image from 'next/image';

export default async function Dashboard() {
  const weightDataset = [
    { date: '2025-07-01', value: 10.5 },
    { date: '2025-07-02', value: 10.8 },
    { date: '2025-07-03', value: 11.2 },
    { date: '2025-07-04', value: 12.0 },
    { date: '2025-07-05', value: 11.9 },
    { date: '2025-07-06', value: 11.2 },
    { date: '2025-07-07', value: 11.0 },
  ];

  const sleepDataset = [
    { date: '2025-07-01', value: 1.5 },
    { date: '2025-07-02', value: 0.8 },
    { date: '2025-07-03', value: 1.2 },
    { date: '2025-07-04', value: 2.0 },
    { date: '2025-07-05', value: 0.9 },
    { date: '2025-07-06', value: 1.2 },
    { date: '2025-07-07', value: 1.0 },
  ];

  return (
    <>
      <div className="w-[1548px] bg-[var(--background)] p-12">
        <div className="mb-13 flex items-center justify-between">
          <Button>수정하기</Button>
          <h2 className="text-[22px] font-bold">
            마음이는 평균보다 3kg 무거워요! 다이어트가 필요하니 간식을 줄여보는
            건 어떨까요?
          </h2>
          <select name="dog" id="dog">
            <option value="이마음">이마음</option>
          </select>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-12">
            <ProfileCard />
            <LineGraphCard title="몸무게" dataset={weightDataset} />
            <LineGraphCard title="수면시간" dataset={sleepDataset} />
          </div>
          <div className="flex flex-col gap-12">
            <div className="relative text-xl font-medium">
              <Image src={speechBubble} alt="말풍선" width={558} height={98} />
              <div className="absolute top-1/2 left-1/2 w-105 -translate-x-1/2 -translate-y-1/2">
                요즘은 시원해서 산책할 때 기분이 아주아주 좋아요!
              </div>
            </div>
            <div className="flex gap-12">
              <FeedCard />
              <TodoCard />
            </div>
            <NoteCard />
          </div>
          <WalkCard />
        </div>
      </div>
    </>
  );
}
