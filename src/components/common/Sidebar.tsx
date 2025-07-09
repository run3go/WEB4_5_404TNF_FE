import Image from 'next/image';
import Icon from './Icon';

export default function Sidebar() {
  return (
    <>
      <div className="relative my-12 ml-14 hidden h-[calc(100vh-96px)] w-[220px] flex-col items-center bg-[#FFFDF7] p-8 text-[#2B2926] sm:flex sm:rounded-[50px]">
        <Image
          src="/images/logo.png"
          alt="멍멍일지 로고"
          width={156}
          height={122}
          priority
        />
        <div className="mt-12 text-[16px] font-medium">
          <div className="sidebar__content group relative">
            <div className="absolute group-hover:opacity-0">
              <Icon width="24px" height="24px" left="-26px" top="-23px" />
            </div>

            <div className="absolute opacity-0 group-hover:opacity-100">
              <Icon width="24px" height="24px" left="-28px" top="-310px" />
            </div>
            <p className="pl-10 group-hover:font-bold">대시보드</p>
          </div>
          <div className="sidebar__content group relative">
            <div className="absolute group-hover:opacity-0">
              <Icon width="24px" height="24px" left="-66px" top="-21px" />
            </div>

            <div className="absolute opacity-0 group-hover:opacity-100">
              <Icon width="24px" height="24px" left="-68px" top="-308px" />
            </div>
            <p className="pl-10 group-hover:font-bold">일정</p>
          </div>
          <div className="sidebar__content group relative">
            <div className="absolute group-hover:opacity-0">
              <Icon width="20px" height="24px" left="-108px" top="-19px" />
            </div>

            <div className="absolute opacity-0 group-hover:opacity-100">
              <Icon width="20px" height="24px" left="-110px" top="-306px" />
            </div>
            <p className="pl-10 group-hover:font-bold">댕댕일지</p>
          </div>
          <div className="sidebar__content group relative">
            <div className="absolute group-hover:opacity-0">
              <Icon width="28px" height="16px" left="-144px" top="-25px" />
            </div>

            <div className="absolute opacity-0 group-hover:opacity-100">
              <Icon width="28px" height="16px" left="-146px" top="-312px" />
            </div>
            <p className="pl-10 group-hover:font-bold">게시판</p>
          </div>
          <div className="sidebar__content group relative">
            <div className="absolute group-hover:opacity-0">
              <Icon width="25px" height="26px" left="-186px" top="-20px" />
            </div>

            <div className="absolute opacity-0 group-hover:opacity-100">
              <Icon width="25px" height="26px" left="-197px" top="-309px" />
            </div>
            <p className="pl-10 group-hover:font-bold">멍초보가이드</p>
          </div>
        </div>
        <div className="absolute bottom-10 text-[16px] font-medium">
          <div className="flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-6">
            <Icon width="24px" height="26px" left="-297px" top="-252px" />
            <p>설정</p>
          </div>
          <div className="flex h-[52px] w-[220px] cursor-pointer items-center gap-3 py-3 pl-6">
            <Icon width="28px" height="28px" left="-264px" top="-18px" />
            <p>로그아웃</p>
          </div>
        </div>
      </div>
    </>
  );
}
