'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '../common/Card';

export default function NoteCard() {
  const [flip, setFlip] = useState(true);
  return (
    <motion.div
      className="relative h-40 w-full max-w-[558px] sm:h-[200px]"
      animate={{ rotateY: flip ? 0 : 180 }}
      transition={{ duration: 0.7 }}
      onClick={() => setFlip(!flip)}
    >
      <motion.div
        className="absolute h-full w-full backface-hidden"
        animate={{ rotateY: flip ? 0 : 180 }}
        transition={{ duration: 0.7 }}
      >
        {/* 앞면 */}
        <Card className="card__hover h-full w-full max-w-[560px] font-medium">
          <h2 className="mb-[18px] text-xs text-[var(--color-grey)] sm:text-base sm:text-[var(--color-black)]">
            관찰노트
          </h2>
          <p className="text-sm sm:p-[9px] sm:text-lg">
            더워서 걸을 때 좀 힘들어함 그거 빼고는 괜찮아 보였음 <br />
            밥을 좀 적게 먹음 간식을 많이 먹여서 그런듯 <br />
            낮잠 자는 시간이 늘어난 것 같음
          </p>
        </Card>
      </motion.div>
      <motion.div
        className="absolute h-full w-full -scale-x-100 backface-hidden"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* 뒷면 */}
        <Card className="card__hover h-40 w-full max-w-[558px] overflow-hidden py-4 sm:h-[200px]">
          <h2 className="mb-[18px] text-xs text-[var(--color-grey)] sm:text-base sm:text-[var(--color-black)]">
            2025. 7. 1
          </h2>
          <p className="text-sm sm:p-[9px] sm:text-lg">
            더워서 걸을 때 좀 힘들어함 그거 빼고는 괜찮아 보였음 <br />
            밥을 좀 적게 먹음 간식을 많이 먹여서 그런듯 <br />
            낮잠 자는 시간이 늘어난 것 같음
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
}
