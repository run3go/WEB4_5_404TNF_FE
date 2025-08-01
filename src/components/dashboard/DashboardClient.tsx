'use client';
import Image from 'next/image';
import SelectBox from '../common/SelectBox';
import FeedCard from './FeedCard';
import LineGraphCard from './graph/LineGraphCard';
import NoteCard from './NoteCard';
import ProfileCard from './ProfileCard';
import TodoCard from './TodoCard';
import WalkCard from './WalkCard';

import {
  getDashboardChecklist,
  getDashboardFeeding,
  getDashboardNote,
  getDashboardProfile,
  getDashboardRecommend,
  getDashboardSleep,
  getDashboardWalking,
  getDashboardWeight,
  getPetList,
} from '@/api/dashboard';

import speechBubbleMobile from '@/assets/images/speech-bubble-mobile.svg';
import speechBubble from '@/assets/images/speech-bubble.png';
import { useDashboardData } from '@/lib/hooks/useDashboard';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Loading from '../common/Loading';
import NoPets from '../schedule/NoPets';

export default function DashboardClient() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [petList, setPetList] = useState<PetProfile[]>([]);
  const [selectedPet, setSelectedPet] = useState(0);
  const [hasPet, setHasPet] = useState(true);

  const {
    isPending,
    checklist,
    feeding,
    note,
    profile,
    recommend,
    sleepList,
    walking,
    weightList,
  } = useDashboardData(selectedPet);
  const queryClient = useQueryClient();
  const petOptions = petList.map((pet) => ({
    value: String(pet.petId),
    label: pet.name,
  }));

  useEffect(() => {
    petList.forEach((pet) => {
      const petId = pet.petId;

      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'profile', petId],
        queryFn: () => getDashboardProfile(petId),
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'weight', petId],
        queryFn: () => getDashboardWeight(petId),
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'sleep', petId],
        queryFn: () => getDashboardSleep(petId),
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'recommend', petId],
        queryFn: () => getDashboardRecommend(petId),
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'feeding', petId],
        queryFn: () => getDashboardFeeding(petId),
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'note', petId],
        queryFn: () => getDashboardNote(petId),
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'checklist', petId],
        queryFn: () => getDashboardChecklist(petId),
      });
      queryClient.prefetchQuery({
        queryKey: ['dashboard', 'walking', petId],
        queryFn: () => getDashboardWalking(petId),
      });
    });
  }, [selectedPet, queryClient, petList]);

  useEffect(() => {
    const getPets = async () => {
      const data: PetProfile[] = await getPetList();
      if (data.length) {
        setPetList(data);
        setSelectedPet(data[0].petId);
      } else {
        setHasPet(false);
      }
    };
    getPets();
  }, []);

  if (!hasPet) return <NoPets content="대시보드를 확인하려면" />;
  if (isPending)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading className="h-50 w-50" />
      </div>
    );
  return (
    <main className="relative w-full px-[26px] py-6 transition-all duration-150 md:h-full md:px-12 md:py-7">
      <div className="flex flex-col-reverse justify-between gap-5 min-[1170px]:flex-row md:mb-7">
        <div className="hidden justify-between overflow-hidden md:flex">
          <h2 className="text-sm font-bold md:text-base lg:block xl:text-lg 2xl:text-xl">
            {recommend ?? '맞춤형 데이터가 없습니다'}
          </h2>
        </div>
        <div className="relative mb-3 w-25 text-sm min-[1170px]:self-end sm:text-base md:mb-0 md:block">
          <SelectBox
            value={String(selectedPet)}
            setValue={(value) => setSelectedPet(Number(value))}
            options={petOptions}
            width={isMobile ? '82px' : '120px'}
            footstep
            type="pet"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 min-[1240px]:grid-cols-[1fr_1fr] md:grid-rows-[auto] 2xl:grid-cols-[93fr_93fr_40fr]">
        <div className="relative mx-auto w-full max-w-[558px] text-sm font-medium md:hidden">
          <Image
            className="h-auto w-full"
            src={speechBubbleMobile}
            alt="말풍선"
            width={558}
            height={98}
            priority
          />
          <div className="absolute top-[40%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-sm min-[500px]:text-base sm:text-xl dark:text-[var(--color-black)]">
            {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다'}
          </div>
        </div>
        <div className="flex flex-col gap-[28px] md:col-span-1 xl:gap-5">
          <ProfileCard profile={profile} />
          {weightList && <LineGraphCard title="몸무게" dataset={weightList} />}
          {sleepList && <LineGraphCard title="수면시간" dataset={sleepList} />}
        </div>
        <div className="flex w-full flex-col gap-5 md:col-span-1">
          <div className="relative hidden font-medium min-[1240px]:block">
            <Image
              className="h-full w-auto"
              src={speechBubble}
              alt="말풍선"
              width={558}
              height={98}
              priority
            />
            <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-10 xl:text-lg dark:text-[var(--color-black)]">
              {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다...'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <FeedCard feeding={feeding} />
            <TodoCard checklist={checklist} petId={selectedPet} />
          </div>
          {note && <NoteCard note={note} />}
        </div>
        <div className="md:col-span-1">
          <WalkCard walking={walking} />
        </div>
      </div>
    </main>
  );
}
