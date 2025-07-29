import DiaryDetailClient from '@/components/diary/DiaryDetailClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '생활 기록 상세',
};

export default async function DiaryDetail({
  params,
}: {
  params: Promise<{ logId: number }>;
}) {
  const { logId } = await params;
  return <DiaryDetailClient logId={logId} />;
}
