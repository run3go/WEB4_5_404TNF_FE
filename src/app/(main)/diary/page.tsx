import DiaryClient from '@/components/diary/DiaryClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '생활 기록',
};

export default function DiaryListPage() {
  return <DiaryClient />;
}
