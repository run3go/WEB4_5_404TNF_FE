import Image from 'next/image';
import logo from '@/assets/images/logo-main1.png';

export default function Sidebar() {
  return (
    <>
      <div className="relative flex h-[100vh] w-[220px] flex-col items-center bg-[#FFFDF7] p-8 text-[#2B2926]">
        <Image src={logo} alt="댕댕일지 로고" />
        <div className="mt-10 ml-2 space-y-6 text-[16px] font-medium">
          <div className="flex h-[40px] w-[180px] cursor-pointer items-center justify-center rounded-[15px] hover:bg-[#FFDBAB]">
            <p>대시보드</p>
          </div>
          <div className="flex h-[40px] w-[180px] cursor-pointer items-center justify-center rounded-[15px] hover:bg-[#FFDBAB]">
            <p>일정</p>
          </div>
          <div className="flex h-[40px] w-[180px] cursor-pointer items-center justify-center rounded-[15px] hover:bg-[#FFDBAB]">
            <p>댕댕일지</p>
          </div>
          <div className="flex h-[40px] w-[180px] cursor-pointer items-center justify-center rounded-[15px] hover:bg-[#FFDBAB]">
            <p>게시판</p>
          </div>
          <div className="flex h-[40px] w-[180px] cursor-pointer items-center justify-center rounded-[15px] hover:bg-[#FFDBAB]">
            <p>케어가이드</p>
          </div>
        </div>
        <div className="absolute bottom-10 space-y-6">
          <div className="flex h-[40px] w-[180px] cursor-pointer items-center justify-center rounded-[15px] hover:bg-[#FFDBAB]">
            <p>다크모드</p>
          </div>
          <div className="flex h-[40px] w-[180px] cursor-pointer items-center justify-center rounded-[15px] hover:bg-[#FFDBAB]">
            <p>로그아웃</p>
          </div>
        </div>
      </div>
    </>
  );
}
