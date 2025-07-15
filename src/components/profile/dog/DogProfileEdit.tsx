import { petBreedData } from '@/assets/data/pet';
import dog from '@/assets/images/default-dog-profile.svg';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import Image from 'next/image';

export default function DogProfileEdit({
  closeModal,
}: {
  closeModal: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
        onClick={closeModal}
      />
      <div className="scrollbar-hidden absolute top-1/2 left-1/2 z-201 h-9/10 w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] px-28 py-14">
        <Icon
          onClick={closeModal}
          className="absolute top-10 right-[70px] cursor-pointer"
          width="16px"
          height="16px"
          left="-302px"
          top="-202px"
        />
        <form className="flex flex-col items-center" action="">
          {/* 사진 선택 */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <Image
              className="rounded-full"
              src={dog}
              alt="강아지 프로필"
              width={120}
              height={120}
              priority
            />
            <span className="text-[var(--color-grey)]">사진 선택하기</span>
          </div>
          <div className="flex justify-between gap-20 pb-14">
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
              {/* 크기 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  크기<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div>
                  <label htmlFor="SMALL">
                    <span className="profile-checkbox-style">소형견</span>
                    <input hidden type="checkbox" name="size" id="SMALL" />
                  </label>
                  <label htmlFor="MEDIUM">
                    <span className="profile-checkbox-style">중형견</span>
                    <input hidden type="checkbox" name="size" id="MEDIUM" />
                  </label>
                  <label htmlFor="LARGE">
                    <span className="profile-checkbox-style">대형견</span>
                    <input hidden type="checkbox" name="size" id="LARGE" />
                  </label>
                </div>
              </div>
              {/* 성별 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  성별<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div>
                  <label htmlFor="male">
                    <span className="profile-checkbox-style">남아</span>
                    <input hidden type="checkbox" name="sex" id="male" />
                  </label>
                  <label htmlFor="female">
                    <span className="profile-checkbox-style">여아</span>
                    <input hidden type="checkbox" name="sex" id="female" />
                  </label>
                </div>
              </div>
              {/* 몸무게 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="weight">
                  몸무게<span className="text-[var(--color-red)]"> *</span>
                </label>
                <input
                  id="weight"
                  className="profile-input-style mr-2 w-[175px]"
                  type="text"
                  placeholder="몸무게를 적어주세요"
                />
                kg
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
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                    width="20px"
                    height="20px"
                    left="-188px"
                    top="-123px"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              {/* 견종 셀렉트박스 스타일 수정 예정 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  견종<span className="text-[var(--color-red)]"> *</span>
                </label>
                <SelectBox options={petBreedData} width="344px" hasBorder />
              </div>

              {/* 생년월일 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="birth">
                  생년월일<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    className="profile-input-style w-full"
                    type="text"
                    placeholder="yyyy / mm / dd"
                  />
                  <Icon
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                    width="20px"
                    height="20px"
                    left="-188px"
                    top="-123px"
                  />
                </div>
              </div>

              {/* 중성화 */}
              <div className="mb-7">
                <label className="mb-2 block" htmlFor="breed">
                  중성화<span className="text-[var(--color-red)]"> *</span>
                </label>
                <div>
                  <label htmlFor="done">
                    <span className="profile-checkbox-style">했어요</span>
                    <input hidden type="checkbox" name="neutering" id="done" />
                  </label>
                  <label htmlFor="undone">
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
          </div>
          <Button className="w-50">수정하기</Button>
        </form>
      </div>
    </>
  );
}
