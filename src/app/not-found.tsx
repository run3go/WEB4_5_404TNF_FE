import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-12 bg-[url('/images/404.svg')] bg-cover pt-45">
        <div className="flex cursor-default flex-col items-center gap-3 text-[40px] font-bold">
          <h1 className="text-[var(--color-primary-500)]">404!</h1>
          <h1>냄새를 따라왔는데... 여긴 아닌가봐요.</h1>
          <h1>다시 발자국을 따라가볼까요?</h1>
        </div>
        <Button className="h-20 w-70 bg-[var(--color-primary-300)] pb-4 text-2xl hover:bg-[var(--color-primary-500)]">
          메인으로 가기
        </Button>
      </div>
    </>
  );
}
