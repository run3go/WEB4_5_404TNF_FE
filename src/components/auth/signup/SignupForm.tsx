'use client';

import Icon from '@/components/common/Icon';

export default function SignupForm() {
  return (
    <form className="flex flex-col justify-center gap-7 p-6">
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="text-[14px] font-medium text-[#909090]"
        >
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          className="auth__input"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <label
            htmlFor="name"
            className="text-[14px] font-medium text-[#909090]"
          >
            닉네임
          </label>
          <button
            className="text-[14px] font-medium text-[#FF9526]"
            type="button"
          >
            중복확인
          </button>
        </div>
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          className="auth__input"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <label
            htmlFor="name"
            className="text-[14px] font-medium text-[#909090]"
          >
            이메일
          </label>
          <button
            className="text-[14px] font-medium text-[#FF9526]"
            type="button"
          >
            이메일 인증
          </button>
        </div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@example.com"
          className="auth__input"
        />
        <input
          name="email"
          type="email"
          placeholder="인증코드를 입력해주세요"
          className="auth__input"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="text-[14px] font-medium text-[#909090]"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="영문/숫자/특수문자 혼합 8~20자"
          className="auth__input"
        />
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          className="auth__input"
        />
      </div>

      <button className="h-[40px] rounded-[12px] bg-[#2B2926]/20 py-[10px]">
        <div className="flex items-center justify-center gap-2">
          <Icon width="20px" height="18px" left="-253px" top="-311px" />
          <p className="text-[14px] font-medium text-[#909090]">
            멍멍일지 회원가입
          </p>
        </div>
      </button>
    </form>
  );
}
