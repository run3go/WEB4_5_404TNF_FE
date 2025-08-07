import SidebarItem from './SidebarItem';

export default function SidebarLinks({ role }: { role?: string | null }) {
  return (
    <div className="mt-[34px] text-sm font-medium md:mt-12 md:text-[16px]">
      <SidebarItem
        href="/dashboard"
        iconSize={{ width: '24px', height: '24px' }}
        iconPosition={{ left: '-26px', top: '-23px' }}
        activeIconPosition={{ left: '-28px', top: '-310px' }}
        title="대시보드"
      />
      <SidebarItem
        href="/schedule"
        iconSize={{ width: '24px', height: '24px' }}
        iconPosition={{ left: '-66px', top: '-21px' }}
        activeIconPosition={{ left: '-68px', top: '-308px' }}
        title="일정"
      />
      <SidebarItem
        href="/diary"
        iconSize={{ width: '24px', height: '24px' }}
        iconPosition={{ left: '-108px', top: '-21px' }}
        activeIconPosition={{ left: '-110px', top: '-308px' }}
        title="멍멍일지"
      />
      <SidebarItem
        href="/post/question"
        iconSize={{ width: '28px', height: '16px' }}
        iconPosition={{ left: '-144px', top: '-25px' }}
        activeIconPosition={{ left: '-146px', top: '-312px' }}
        title="게시판"
      />
      <SidebarItem
        href="/guide"
        iconSize={{ width: '25px', height: '26px' }}
        iconPosition={{ left: '-186px', top: '-20px' }}
        activeIconPosition={{ left: '-197px', top: '-309px' }}
        title="멍초보가이드"
      />
      {role === 'ROLE_ADMIN' && (
        <SidebarItem
          href="/admin"
          iconSize={{ width: '24px', height: '26px' }}
          iconPosition={{ left: '-342px', top: '-20px' }}
          activeIconPosition={{ left: '-382px', top: '-20px' }}
          title="관리자페이지"
        />
      )}
    </div>
  );
}
