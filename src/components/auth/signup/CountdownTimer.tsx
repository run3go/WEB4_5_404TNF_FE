'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  keyReset: number;
  seconds: number;
  onStatusChange?: (expired: boolean) => void;
}

export default function CountdownTimer({
  keyReset,
  seconds,
  onStatusChange,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);

    setTimeout(() => {
      onStatusChange?.(false);
    }, 0);

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setTimeout(() => {
            onStatusChange?.(true);
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [keyReset, seconds, onStatusChange]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString();
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return <span className="mt-2 text-[#ED4848]">{formatTime(timeLeft)}</span>;
}
