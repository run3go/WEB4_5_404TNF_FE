import '@/assets/styles/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | 멍멍일지',
    default: '멍멍일지',
  },
  description:
    '멍멍일지는 반려견 보호자들이 사랑스러운 반려견에게 개인 맞춤형 최적의 일상 루틴을 제공하고, 다른 보호자들과 유용한 정보와 경험을 공유하며 궁금증을 해소할 수 있는 반려동물 관리 플랫폼입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
