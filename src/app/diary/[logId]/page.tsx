export default async function DiaryDetail({
  params,
}: {
  params: Promise<{ logId: string }>;
}) {
  const { logId } = await params;
  return (
    <>
      <h1>{logId}</h1>
    </>
  );
}
