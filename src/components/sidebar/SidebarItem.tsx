import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Icon from '../common/Icon';
import Tooltip from './Tooltip';

export default function SidebarItem({
  href,
  iconSize,
  iconPosition,
  activeIconPosition,
  title,
}: {
  href: string;
  iconSize: { width: string; height: string };
  iconPosition: { left: string; top: string };
  activeIconPosition: { left: string; top: string };
  title: string;
}) {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Link
      href={href}
      className={`sidebar__content group relative ${pathname === href && 'sidebar__content-active'}`}
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`absolute ${pathname === href && 'opacity-0'}`}>
        <Icon {...iconSize} {...iconPosition} />
      </div>
      <div
        className={`absolute opacity-0 ${pathname === href && 'opacity-100'} `}
      >
        <Icon {...iconSize} {...activeIconPosition} />
      </div>
      <p className="block pl-10 md:hidden xl:block">{title}</p>
      {showTooltip && <Tooltip title={title} />}
    </Link>
  );
}
