import FeedCard from '@/components/dashboard/FeedCard';
import LineGraphCard from '@/components/dashboard/LineGraphCard';
import NoteCard from '@/components/dashboard/NoteCard';
import ProfileCard from '@/components/dashboard/ProfileCard';
import TodoCard from '@/components/dashboard/TodoCard';
import WalkCard from '@/components/dashboard/WalkCard';

export default async function Dashboard() {
  return (
    <>
      <div className="w-[1548px] bg-[var(--background)] p-12">
        <div className="mb-13 flex items-center justify-between">
          <h2 className="text-[22px] font-bold">
            마음이는 평균보다 3kg 무거워요! 다이어트가 필요하니 간식을 줄여보는
            건 어떨까요?
          </h2>
          <select name="dog" id="dog">
            <option value="이마음">이마음</option>
          </select>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-12">
            <ProfileCard />
            <LineGraphCard title="몸무게" />
            <LineGraphCard title="수면시간" />
          </div>
          <div className="flex flex-col gap-12">
            <div className="h-25 w-[558px] bg-amber-400"></div>
            <div className="flex gap-12">
              <FeedCard />
              <TodoCard />
            </div>
            <NoteCard />
          </div>
          <WalkCard />
        </div>
      </div>
    </>
  );
}
