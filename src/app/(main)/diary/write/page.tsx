import DiaryWriteClient from '@/components/diary/DiaryWriteClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '생활 기록',
};

export default function DiaryWritePage() {
  return <DiaryWriteClient />;
}
