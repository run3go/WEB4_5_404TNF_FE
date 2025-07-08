import defaultProfile from '@/assets/images/default-profile.svg';
import Image from 'next/image';
import Icon from '../../common/Icon';
import MobileTitle from '../../common/MobileTitle';

export default function UserProfileEditMobile() {
  return (
    <main className="w-screen">
      <MobileTitle title="프로필 수정" />
      <div className="relative h-screen bg-[var(--color-background)] px-6 py-9 text-sm">
        <form className="flex flex-col">
          <div className="mb-9 flex flex-col items-center gap-4">
            <Image
              className="rounded-full"
              src={defaultProfile}
              alt="강아지 프로필"
              width={100}
              height={100}
              priority
            />
            <span className="text-[var(--color-grey)]">사진 선택하기</span>
          </div>
          <div className="mb-8 flex basis-1/2 flex-col gap-5">
            <span>이메일</span>
            <span>user@naver.com</span>
          </div>
          <div className="mb-8 flex basis-1/2 flex-col gap-5">
            <span>가입유형</span>
            <div className="flex items-center gap-2">
              <span>NAVER</span>
              <Icon width="20px" height="20px" left="-184px" top="-256px" />
            </div>
          </div>
          <div className="mb-5 basis-1/2">
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
          <div className="mb-8 basis-1/2">
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
          <span className="cursor-pointer self-start underline">
            비밀번호 변경
          </span>
          <div className="flex flex-col gap-5">
            <div className="mt-8 w-full items-center">
              <label className="mb-3 block" htmlFor="name">
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
            <div className="w-full items-center">
              <label className="mb-3 block" htmlFor="name">
                새 비밀번호
              </label>
              <input
                id="name"
                className="profile-input-style w-full"
                type="password"
                placeholder="영문/숫자/특수문자 혼합 8~20자"
              />
            </div>
            <div className="w-full items-center">
              <label className="mb-3 block" htmlFor="name">
                새 비밀번호 확인
              </label>
              <input
                id="name"
                className="profile-input-style w-full"
                type="password"
                placeholder="비밀번호를 한 번 더 입력해 주세요"
              />
            </div>
          </div>
          <button className="mt-20 mb-6 self-end text-[var(--color-grey)]">
            회원 탈퇴
          </button>

          <div className="h-15" />
          <button className="fixed right-0 bottom-0 left-0 bg-[var(--color-primary-300)] py-5">
            수정하기
          </button>
        </form>
      </div>
    </main>
  );
}
