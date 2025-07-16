import { petBreedData } from '@/assets/data/pet';
import dog from '@/assets/images/default-dog-profile.svg';
import Icon from '@/components/common/Icon';
import MobileTitle from '@/components/common/MobileTitle';
import SelectBox from '@/components/common/SelectBox';
import { useProfileStore } from '@/stores/profileStore';
import Image from 'next/image';

export default function DogProfileEditMobile() {
  const profileStore = useProfileStore();
  return (
    <main className="w-screen">
      <MobileTitle
        title="반려견 등록"
        onClick={() => {
          profileStore.toggleEditingPetProfile();
        }}
        closePage={() => {
          profileStore.toggleEditingPetProfile();
        }}
      />
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
                <SelectBox options={petBreedData} width="full" hasBorder />
              </div>
              {/* 크기 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  크기<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div className="flex w-full justify-between gap-3">
                  <label className="grow" htmlFor="SMALL">
                    <span className="profile-radio-style">소형견</span>
                    <input hidden type="checkbox" name="size" id="SMALL" />
                  </label>
                  <label className="grow" htmlFor="MEDIUM">
                    <span className="profile-radio-style">중형견</span>
                    <input hidden type="checkbox" name="size" id="MEDIUM" />
                  </label>
                  <label className="grow" htmlFor="LARGE">
                    <span className="profile-radio-style">대형견</span>
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
                    <span className="profile-radio-style">남아</span>
                    <input hidden type="checkbox" name="sex" id="male" />
                  </label>
                  <label className="basis-[calc(50%-6px)]" htmlFor="female">
                    <span className="profile-radio-style">여아</span>
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
                    <span className="profile-radio-style">했어요</span>
                    <input hidden type="checkbox" name="neutering" id="done" />
                  </label>
                  <label className="basis-[calc(50%-6px)]" htmlFor="undone">
                    <span className="profile-radio-style">안했어요</span>
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
        </form>
      </div>
    </main>
  );
}
