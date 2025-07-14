'use client';
import roadmapMobile from '@/assets/images/guide-roadmap-mobile.svg';
import roadmap from '@/assets/images/guide-roadmap.svg';
import Image from 'next/image';
import RoadmapItem from './RoadmapItem';

export default function Roadmap() {
  return (
    <div
      className="absolute top-[55%] left-1/2 flex w-full -translate-x-1/2 -translate-y-2/5 justify-center sm:top-1/2 sm:-translate-y-1/3"
      id="guide-container"
    >
      <div className="relative flex w-full justify-center select-none">
        <Image
          className="block sm:hidden"
          src={roadmapMobile}
          alt="로드맵"
          priority
        />

        <Image
          className="hidden w-[75%] sm:block"
          src={roadmap}
          alt="로드맵"
          priority
        />
        <ol className="text-center text-sm sm:text-base">
          <RoadmapItem
            className="bottom-[95%] left-[27%] sm:bottom-[89%] sm:left-[28%]"
            month={1}
          />
          <RoadmapItem
            className="bottom-[95%] left-[45%] sm:bottom-[89%] sm:left-[39%]"
            month={2}
          />
          <RoadmapItem
            className="bottom-[95%] left-[63%] sm:bottom-[89%] sm:left-[50%]"
            month={3}
          />
          <RoadmapItem
            className="bottom-[64%] left-[69%] sm:bottom-[89%] sm:left-[61%]"
            month={4}
          />
          <RoadmapItem
            className="bottom-[64%] left-[53%] sm:bottom-[89%] sm:left-[72%]"
            month={5}
          />
          <RoadmapItem
            className="bottom-[64%] left-[37%] sm:bottom-[46.6%] sm:left-[69%]"
            month={6}
          />
          <RoadmapItem
            className="bottom-[64%] left-[21%] sm:bottom-[46.6%] sm:left-[57%]"
            month={7}
          />
          <RoadmapItem
            className="bottom-[33%] left-[27%] sm:bottom-[46.6%] sm:left-[45%]"
            month={8}
          />
          <RoadmapItem
            className="bottom-[33%] left-[45%] sm:bottom-[46.6%] sm:left-[33%]"
            month={9}
          />
          <RoadmapItem
            className="bottom-[33%] left-[63%] sm:bottom-[4.2%] sm:left-[33%]"
            month={10}
          />
          <RoadmapItem
            className="bottom-[2.5%] left-[63%] sm:bottom-[4.2%] sm:left-[45%]"
            month={11}
          />
          <RoadmapItem
            className="bottom-[2.5%] left-[45%] sm:bottom-[4.2%] sm:left-[57%]"
            month={12}
          />
          <RoadmapItem
            className="bottom-[2.5%] left-[27%] sm:bottom-[4.2%] sm:left-[69%]"
            month={13}
          />
        </ol>
      </div>
    </div>
  );
}
