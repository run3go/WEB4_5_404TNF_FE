import Lottie from 'lottie-react';
import loading from '../../assets/images/loading-paws.json';
import { twMerge } from 'tailwind-merge';

export default function Loading({ className }: { className?: string }) {
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <Lottie
          animationData={loading}
          loop={true}
          className={twMerge('size-[380px]', className)}
        />
      </div>
    </>
  );
}
