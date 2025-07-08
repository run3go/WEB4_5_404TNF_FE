import defaultProfile from '@/assets/images/default-profile.svg';
import Image from 'next/image';
import Icon from '../common/Icon';

export default function UserProfile() {
  // const [portalElement, setPortalElement] = useState<Element | null>(null);

  // useEffect(() => {
  //   setPortalElement(document.querySelector('#profile-container'));
  // }, []);

  return (
    <div className="mb-18 sm:mb-20">
      <h2 className="mr-7 inline text-sm text-[var(--color-primary-500)] sm:text-2xl">
        마이 프로필
      </h2>
      <button className="inline-flex h-[26px] w-[66px] cursor-pointer items-center justify-center gap-2 rounded-[30px] border-1 border-[var(--color-grey)] text-[10px] sm:h-10 sm:w-25 sm:text-base">
        <Icon
          className="hidden sm:block"
          width="14px"
          height="14px"
          left="-225px"
          top="-168px"
        />
        <Icon
          className="block sm:hidden"
          width="9px"
          height="9px"
          left="-31px"
          top="-127px"
        />
        <span className="text-[var(--color-grey)]">수정</span>
      </button>
      <div className="mt-7 flex gap-7">
        <Image
          className="h-25 w-25 rounded-full sm:h-40 sm:w-40"
          src={defaultProfile}
          alt="프로필 이미지"
          width={160}
          height={160}
        />
        <div className="flex flex-col justify-around text-xs sm:text-xl">
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              이메일
            </span>
            user@naver.com
          </div>
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              이름
            </span>
            홍길동
          </div>
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              닉네임
            </span>
            닉네임
          </div>
          <div>
            <span className="inline-block w-[59px] text-[var(--color-grey)] sm:w-[93px]">
              가입유형
            </span>
            NAVER
          </div>
        </div>
      </div>
      {/* 유저 정보 수정 (스크롤 막기 기능 구현 필요) */}
      {/* {portalElement && createPortal(<UserProfileEdit />, portalElement)} */}
    </div>
  );
}
