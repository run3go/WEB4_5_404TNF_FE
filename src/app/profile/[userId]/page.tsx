export default async function Profile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <>
      <h1>{userId}</h1>
    </>
  );
}
