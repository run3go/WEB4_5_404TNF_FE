import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <>
      <Link href="/">
        <Image
          className="hidden md:block"
          src="/images/logo.svg"
          alt="멍멍일지 로고"
          width={156}
          height={122}
          priority
        />
      </Link>
      <Link href="/">
        <Image
          className="mx-auto block pt-8 md:hidden"
          src="/images/logo.svg"
          alt="멍멍일지 로고"
          width={100}
          height={78}
          priority
        />
      </Link>
    </>
  );
}
