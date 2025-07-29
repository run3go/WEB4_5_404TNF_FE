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

import loadingSpinner from '@/assets/images/loading-footprint.json';
import speechBubbleMobile from '@/assets/images/speech-bubble-mobile.svg';
import speechBubble from '@/assets/images/speech-bubble.png';
import { useDashboardData } from '@/lib/hooks/useDashboard';
import { useQueryClient } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NoPets from '../schedule/NoPets';

export default function DashboardClient() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const [petList, setPetList] = useState<PetProfile[]>([]);
  const [selectedPet, setSelectedPet] = useState(0);

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
      setPetList(data);
      setSelectedPet(data[0].petId);
    };
    getPets();
  }, []);
  if (isPending)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Lottie className="h-50 w-50" animationData={loadingSpinner} />
      </div>
    );
  if (!selectedPet) return <NoPets content="대시보드를 확인하려면" />;
  return (
    <main className="relative h-full px-[26px] py-6 transition-all duration-150 sm:px-12 sm:py-7">
      <div className="hidden h-8 w-[80%] justify-between overflow-hidden sm:mb-7 sm:flex">
        <h2 className="hidden text-xl font-bold sm:block">
          {recommend ?? '맞춤형 데이터가 없습니다'}
        </h2>
      </div>
      <div className="relative mb-3 w-25 text-sm sm:absolute sm:top-7 sm:right-[65px] sm:mb-0 sm:block sm:self-end sm:text-base">
        <SelectBox
          value={String(selectedPet)}
          setValue={(value) => setSelectedPet(Number(value))}
          options={petOptions}
          width={isMobile ? '82px' : '105px'}
          footstep
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[93fr_93fr_40fr] sm:grid-rows-[auto]">
        <div className="relative w-full text-sm font-medium sm:hidden sm:text-xl">
          <Image
            className="h-auto w-full max-w-[558px]"
            src={speechBubbleMobile}
            alt="말풍선"
            width={558}
            height={98}
            priority
          />
          <div className="absolute top-[40%] left-1/2 w-full max-w-105 -translate-x-1/2 -translate-y-1/2 px-8 text-sm min-[500px]:text-base dark:text-[var(--color-black)]">
            {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다'}
          </div>
        </div>
        <div className="flex flex-col gap-5 sm:col-span-1">
          <ProfileCard profile={profile} />
          {weightList && <LineGraphCard title="몸무게" dataset={weightList} />}
          {sleepList && <LineGraphCard title="수면시간" dataset={sleepList} />}
        </div>
        <div className="flex w-full flex-col gap-5 sm:col-span-1">
          <div className="relative hidden text-xl font-medium sm:block">
            <Image
              className="h-[98px] w-full"
              src={speechBubble}
              alt="말풍선"
              width={558}
              height={98}
              priority
            />
            <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-10 text-lg dark:text-[var(--color-black)]">
              {profile?.aiAnalysis ?? 'AI 분석 결과가 없습니다...'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <FeedCard feeding={feeding} />
            <TodoCard checklist={checklist} petId={selectedPet} />
          </div>
          {note && <NoteCard note={note} />}
        </div>
        <div className="sm:col-span-1">
          <WalkCard walking={walking} />
        </div>
      </div>
    </main>
  );
}
