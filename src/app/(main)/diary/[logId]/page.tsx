import DiaryDetailClient from '@/components/diary/DiaryDetailClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상세 페이지',
};

export default async function DiaryDetail({
  params,
}: {
  params: Promise<{ logId: number }>;
}) {
  const { logId } = await params;
  return <DiaryDetailClient logId={logId} />;
}
