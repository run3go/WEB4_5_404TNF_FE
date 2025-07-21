'use client';
import Image from 'next/image';
import SelectBox from '../common/SelectBox';
import FeedCard from './FeedCard';
import LineGraphCard from './graph/LineGraphCard';
import NoteCard from './NoteCard';
import ProfileCard from './ProfileCard';
import TodoCard from './TodoCard';
import WalkCard from './WalkCard';

import speechBubbleMobile from '@/assets/images/speech-bubble-mobile.svg';
import speechBubble from '@/assets/images/speech-bubble.png';
import {
  useDashboardFeeding,
  useDashboardNote,
  useDashboardProfile,
  useDashboardRecommend,
  useDashboardSleep,
  useDashboardWeight,
} from '@/lib/hooks/useDashboard';
import { useState } from 'react';

export default function DashboardClient({
  petList,
}: {
  petList: PetProfile[];
}) {
  const [selectedPet, setSelectedPet] = useState(petList[0].petId);

  const { data: profile } = useDashboardProfile(selectedPet);
  const { data: weightList } = useDashboardWeight(selectedPet);
  const { data: sleepList } = useDashboardSleep(selectedPet);
  const { data: note } = useDashboardNote(selectedPet);
  const { data: recommend } = useDashboardRecommend(selectedPet);
  const { data: feeding } = useDashboardFeeding(selectedPet);

  const petOptions = petList.map((pet) => ({
    value: String(pet.petId),
    label: pet.name,
  }));

  return (
    <main className="relative h-full px-[26px] py-6 sm:px-12 sm:py-7">
      <div className="flex items-center justify-between sm:mb-7">
        <h2 className="hidden text-xl font-bold sm:block">
          {recommend ?? '맞춤형 데이터가 없습니다'}
        </h2>
      </div>
      <div className="absolute top-7 right-[65px] hidden self-end text-base sm:block">
        <SelectBox
          value={String(selectedPet)}
          setValue={(value) => setSelectedPet(Number(value))}
          options={petOptions}
          width="105px"
          footstep
        />
      </div>
      <div className="flex flex-wrap gap-5 pb-7 sm:gap-8 sm:pb-0">
        <div className="relative w-full text-sm font-medium sm:hidden sm:text-xl">
          <Image
            className="h-auto w-full max-w-[558px]"
            src={speechBubbleMobile}
            alt="말풍선"
            width={558}
            height={98}
            priority
          />
          <div className="absolute top-[20%] left-1/2 w-full max-w-105 -translate-x-1/2 px-14 min-[500px]:text-lg">
            {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다'}
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-[520px] sm:gap-8">
          <ProfileCard profile={profile} />
          <LineGraphCard title="몸무게" dataset={weightList} />
          <LineGraphCard title="수면시간" dataset={sleepList} />
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-[558px] sm:gap-8">
          <div className="relative hidden text-xl font-medium sm:block">
            <Image
              className="h-auto w-full max-w-[558px]"
              src={speechBubble}
              alt="말풍선"
              width={558}
              height={98}
            />
            <div className="absolute top-1/2 left-1/2 w-full max-w-105 -translate-x-1/2 -translate-y-1/2">
              {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-5 sm:gap-8">
            <FeedCard feeding={feeding} />
            <TodoCard />
          </div>
          <NoteCard note={note} />
        </div>
        <WalkCard />
      </div>
    </main>
  );
}
