import defaultProfile from '@/assets/images/default-profile.svg';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Image from 'next/image';

export default function UserProfileEdit({
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
        <form className="relative flex flex-col items-center" action="">
          {/* 사진 선택 */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <Image
              className="rounded-full"
              src={defaultProfile}
              alt="강아지 프로필"
              width={120}
              height={120}
            />
            <span className="text-[var(--color-grey)]">사진 선택하기</span>
          </div>
          <div className="flex w-full gap-20">
            <div className="flex basis-1/2 flex-col gap-5">
              <span>이메일</span>
              <span>user@naver.com</span>
            </div>
            <div className="flex basis-1/2 flex-col gap-5">
              <span>가입유형</span>
              <span>NAVER</span>
            </div>
          </div>
          <div className="mt-11 flex w-full gap-20">
            <div className="mb-7 basis-1/2">
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
            <div className="mb-7 basis-1/2">
              <label className="mb-2 block" htmlFor="name">
                닉네임<span className="text-[var(--color-red)]"> *</span>
              </label>
              <input
                id="name"
                className="profile-input-style w-full"
                type="text"
                placeholder="닉네임을 적어주세요 (1~10자 이내)"
              />
            </div>
          </div>
          <span className="cursor-pointer self-start underline">
            비밀번호 변경
          </span>
          <div className="mt-8 mb-7 flex w-full items-center">
            <label className="basis-1/4" htmlFor="name">
              현재 비밀번호
            </label>
            <div className="flex w-full">
              <input
                id="name"
                className="profile-input-style w-full"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
              />
              <button className="ml-4 w-18 cursor-pointer rounded-[12px] bg-[var(--color-primary-300)] py-[10px] hover:bg-[var(--color-primary-500)]">
                확인
              </button>
            </div>
          </div>
          <div className="mb-7 flex w-full items-center">
            <label className="basis-1/4" htmlFor="name">
              새 비밀번호
            </label>
            <input
              id="name"
              className="profile-input-style w-full"
              type="password"
              placeholder="영문/숫자/특수문자 혼합 8~20자"
            />
          </div>
          <div className="mb-7 flex w-full items-center">
            <label className="basis-1/4" htmlFor="name">
              새 비밀번호 확인
            </label>
            <input
              id="name"
              className="profile-input-style w-full"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
            />
          </div>
          <Button className="mt-15 w-50">수정하기</Button>
          <button className="absolute -right-17 -bottom-8 text-[var(--color-grey)]">
            회원 탈퇴
          </button>
        </form>
      </div>
    </>
  );
}
