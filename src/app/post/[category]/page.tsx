export default async function Board({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <>
      <h1>{category}</h1>
    </>
  );
}
