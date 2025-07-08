import dog from '@/assets/images/default-dog-profile.svg';
import Icon from '@/components/common/Icon';
import MobileTitle from '@/components/common/MobileTitle';
import SelectBox from '@/components/common/SelectBox';
import Image from 'next/image';

export default function DogProfileEditMobile() {
  const options = [
    { value: 'BEAGLE', label: '비글' },
    { value: 'BICHON_FRISE', label: '비숑 프리제' },
    { value: 'BORDER_COLLIE', label: '보더 콜리' },
    { value: 'BOXER', label: '복서' },
    { value: 'BULLDOG', label: '불독' },
    { value: 'CHIHUAHUA', label: '치와와' },
    { value: 'COCKER_SPANIEL', label: '코커 스패니얼' },
    { value: 'DACHSHUND', label: '닥스훈트' },
    { value: 'DOBERMAN', label: '도베르만' },
    { value: 'FRENCH_BULLDOG', label: '프렌치 불독' },
    { value: 'GERMAN_SHEPHERD', label: '저먼 셰퍼드' },
    { value: 'GOLDEN_RETRIEVER', label: '골든 리트리버' },
    { value: 'GREAT_DANE', label: '그레이트 데인' },
    { value: 'HUSKY', label: '허스키' },
    { value: 'JACK_RUSSELL', label: '잭 러셀 테리어' },
    { value: 'LABRADOR', label: '래브라도 리트리버' },
    { value: 'MALTESE', label: '말티즈' },
    { value: 'PAPILLON', label: '파피용' },
    { value: 'POMERANIAN', label: '포메라니안' },
    { value: 'POODLE', label: '푸들' },
    { value: 'PUG', label: '퍼그' },
    { value: 'SAMOYED', label: '사모예드' },
    { value: 'SHIBA_INU', label: '시바 이누' },
    { value: 'SHIH_TZU', label: '시츄' },
    { value: 'WELSH_CORGI', label: '웰시 코기' },
    { value: 'YORKSHIRE_TERRIER', label: '요크셔 테리어' },
    { value: 'MIX', label: '믹스견' },
  ];

  const vaccineTypes = [
    { value: 'DHPPL', label: 'DHPPL (종합백신)' },
    { value: 'CORONAVIRUS', label: '코로나' },
    { value: 'KENNEL_COUGH', label: '켄넬코프' },
    { value: 'RABIES', label: '광견병' },
    { value: 'INFLUENZA', label: '인플루엔자' },
  ];
  return (
    <main className="w-screen">
      <MobileTitle title="반려견 등록" />
      <div className="relative h-screen bg-[var(--color-background)] px-6 py-9 text-sm">
        <form className="flex flex-col" action="">
          {/* 사진 선택 */}
          <div className="mb-9 flex flex-col items-center gap-4">
            <Image
              className="rounded-full"
              src={dog}
              alt="강아지 프로필"
              width={100}
              height={100}
              priority
            />
            <span className="text-[var(--color-grey)]">사진 선택하기</span>
          </div>
          <div className="flex flex-col justify-between gap-20 border-b border-[var(--color-grey)] pb-10">
            <div className="w-full">
              {/* 이름 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="name">
                  이름<span className="text-[var(--color-red)]"> *</span>
                </label>
                <input
                  id="name"
                  className="profile-input-style w-full"
                  type="text"
                  placeholder="이름을 적어주세요 (1~10자 이내)"
                />
              </div>
              {/* 견종 셀렉트박스 스타일 수정 예정 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  견종<span className="text-[var(--color-red)]"> *</span>
                </label>
                <SelectBox options={options} width={344} hasBorder />
              </div>
              {/* 크기 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  크기<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div className="flex w-full justify-between gap-3">
                  <label className="grow" htmlFor="SMALL">
                    <span className="profile-checkbox-style">소형견</span>
                    <input hidden type="checkbox" name="size" id="SMALL" />
                  </label>
                  <label className="grow" htmlFor="MEDIUM">
                    <span className="profile-checkbox-style">중형견</span>
                    <input hidden type="checkbox" name="size" id="MEDIUM" />
                  </label>
                  <label className="grow" htmlFor="LARGE">
                    <span className="profile-checkbox-style">대형견</span>
                    <input hidden type="checkbox" name="size" id="LARGE" />
                  </label>
                </div>
              </div>
              {/* 생년월일 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="birth">
                  태어난 날<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    className="profile-input-style w-full"
                    type="text"
                    placeholder="yyyy / mm / dd"
                  />
                  <Icon
                    className="absolute top-1/2 right-4 -translate-y-1/2 scale-80"
                    width="20px"
                    height="20px"
                    left="-188px"
                    top="-123px"
                  />
                </div>
              </div>
              {/* 성별 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  성별<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div className="flex gap-3">
                  <label className="basis-[calc(50%-6px)]" htmlFor="male">
                    <span className="profile-checkbox-style">남아</span>
                    <input hidden type="checkbox" name="sex" id="male" />
                  </label>
                  <label className="basis-[calc(50%-6px)]" htmlFor="female">
                    <span className="profile-checkbox-style">여아</span>
                    <input hidden type="checkbox" name="sex" id="female" />
                  </label>
                </div>
              </div>
              {/* 중성화 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  중성화<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div className="flex gap-3">
                  <label className="basis-[calc(50%-6px)]" htmlFor="done">
                    <span className="profile-checkbox-style">했어요</span>
                    <input hidden type="checkbox" name="neutering" id="done" />
                  </label>
                  <label className="basis-[calc(50%-6px)]" htmlFor="undone">
                    <span className="profile-checkbox-style">안했어요</span>
                    <input
                      hidden
                      type="checkbox"
                      name="neutering"
                      id="undone"
                    />
                  </label>
                </div>
              </div>
              {/* 몸무게 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="weight">
                  몸무게<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div>
                  <input
                    id="weight"
                    className="profile-input-style mr-2 w-[calc(50%-6px)]"
                    type="text"
                    placeholder="몸무게를 적어주세요"
                  />
                  kg
                </div>
              </div>
              <div className="w-full">
                {/* 등록번호 */}
                <div className="mb-7">
                  <label className="mb-2 block" htmlFor="weight">
                    등록번호<span className="text-[var(--color-red)]"> *</span>
                  </label>
                  <input
                    id="weight"
                    className="profile-input-style mr-2 w-full"
                    type="text"
                    placeholder="등록번호를 적어주세요"
                  />
                </div>
              </div>
              {/* 처음 만난 날 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="name">
                  처음 만난 날
                  <span className="text-[var(--color-red)]"> *</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    className="profile-input-style w-full"
                    type="text"
                    placeholder="yyyy / mm / dd"
                  />
                  <Icon
                    className="absolute top-1/2 right-4 -translate-y-1/2 scale-80"
                    width="20px"
                    height="20px"
                    left="-188px"
                    top="-123px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 mb-10 w-full self-start">
            <span className="mr-5">예방접종</span>
            <button className="mb-4 text-[15px] text-[var(--color-primary-500)]">
              + 추가
            </button>
            <div>
              <div className="flex w-full border-b border-[var(--color-primary-300)] py-[10px] text-xs">
                <span className="basis-3/7">백신이름</span>
                <span className="basis-4/7">접종일</span>
                <span className="basis-2/7">차수</span>
              </div>
            </div>
            <ul className="mt-2 flex w-full flex-col gap-2 text-xs">
              <li className="flex w-full items-center gap-2">
                <div className="basis-3/7">
                  <SelectBox options={vaccineTypes} width={100} hasBorder />
                </div>
                <div className="relative basis-4/7">
                  <input
                    id="name"
                    className="profile-input-style w-full"
                    type="text"
                    placeholder="yyyy / mm / dd"
                  />
                  <Icon
                    className="absolute top-1/2 right-4 -translate-y-1/2 scale-70"
                    width="20px"
                    height="20px"
                    left="-188px"
                    top="-123px"
                  />
                </div>
                <div className="flex basis-3/14 items-center">
                  <input
                    className="profile-input-style mr-2 w-[29px] text-center"
                    type="text"
                  />
                  차
                </div>
                <div className="basis-1/14">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary-300)]">
                    <div className="h-[1px] w-[6px] bg-[var(--color-black)]" />
                  </div>
                </div>
              </li>
              <li className="flex w-full items-center gap-2">
                <div className="basis-3/7">
                  <SelectBox options={vaccineTypes} width={100} hasBorder />
                </div>
                <div className="relative basis-4/7">
                  <input
                    id="name"
                    className="profile-input-style w-full"
                    type="text"
                    placeholder="yyyy / mm / dd"
                  />
                  <Icon
                    className="absolute top-1/2 right-4 -translate-y-1/2 scale-70"
                    width="20px"
                    height="20px"
                    left="-188px"
                    top="-123px"
                  />
                </div>
                <div className="flex basis-3/14 items-center">
                  <input
                    className="profile-input-style mr-2 w-[29px] text-center"
                    type="text"
                  />
                  차
                </div>
                <div className="basis-1/14">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary-300)]">
                    <div className="h-[1px] w-[6px] bg-[var(--color-black)]" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="h-15" />
          <button className="fixed right-0 bottom-0 left-0 bg-[var(--color-primary-300)] py-5">
            수정하기
          </button>
        </form>
      </div>
    </main>
  );
}
