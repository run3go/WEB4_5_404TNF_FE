import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Icon from '../common/Icon';

export default function SidebarContent() {
  return (
    <Link href={'/dashboard'}>
      <div
        className={twMerge(
          'sidebar__content group relative',
          pathname === '/dashboard' ? 'sidebar__content-active' : '',
        )}
      >
        <div
          className={twMerge(
            'absolute group-hover:opacity-0',
            pathname === '/dashboard' ? 'opacity-0' : '',
          )}
        >
          <Icon width="24px" height="24px" left="-26px" top="-23px" />
        </div>

        <div
          className={twMerge(
            'absolute opacity-0 group-hover:opacity-100',
            pathname === '/dashboard' ? 'opacity-100' : '',
          )}
        >
          <Icon width="24px" height="24px" left="-28px" top="-310px" />
        </div>
        <p className="pl-10 group-hover:font-bold">대시보드</p>
      </div>
    </Link>
  );
}
