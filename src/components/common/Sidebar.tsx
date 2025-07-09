import Image from 'next/image';
import Icon from './Icon';

export default function Sidebar() {
  return (
    <>
      <div className="relative my-12 ml-14 hidden h-[calc(100vh-96px)] w-[220px] flex-col items-center bg-[#FFFDF7] p-8 text-[#2B2926] sm:flex">
        <Image
          src="/images/logo.png"
          alt="멍멍일지 로고"
          width={156}
          height={122}
          priority
        />
        <div className="mt-10 ml-2 text-[16px] font-medium">
          <div className="sidebar__content">
            <Icon width="28px" height="28px" left="-22px" top="-21px" />
            <p>대시보드</p>
          </div>
          <div className="sidebar__content">
            <Icon width="28px" height="28px" left="-62px" top="-19px" />
            <p>일정</p>
          </div>
          <div className="sidebar__content">
            <Icon width="28px" height="28px" left="-102px" top="-17px" />
            <p>댕댕일지</p>
          </div>
          <div className="sidebar__content">
            <Icon width="28px" height="28px" left="-144px" top="-19px" />
            <p>게시판</p>
          </div>
          <div className="sidebar__content">
            <Icon width="28px" height="28px" left="-184px" top="-19px" />
            <p>케어가이드</p>
          </div>
        </div>
        <div className="absolute bottom-10 text-[16px] font-medium">
          <div className="sidebar__content">
            <Icon width="28px" height="28px" left="-224px" top="-18px" />
            <p>다크모드</p>
          </div>
          <div className="sidebar__content">
            <Icon width="28px" height="28px" left="-264px" top="-18px" />
            <p>로그아웃</p>
          </div>
        </div>
      </div>
    </>
  );
}
