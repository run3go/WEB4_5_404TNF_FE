import DiaryDetailClient from '@/components/diary/DiaryDetailClient';

export default async function DiaryDetail({
  params,
}: {
  params: Promise<{ logId: number }>;
}) {
  const { logId } = await params;
  return <DiaryDetailClient logId={logId} />;
}
