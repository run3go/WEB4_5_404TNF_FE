import MeatballsMenu from '../common/MeatballsMenu';
import WriterInfo from '../common/WriterInfo';

const COMMENTS = [
  {
    id: '1',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용댓',
  },
  {
    id: '2',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용',
  },
  {
    id: '3',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용',
  },
  {
    id: '4',
    name: '유저닉네임',
    postedAt: '2025.06.20 12:34',
    content: '댓글 내용내용',
  },
];

export default function CommentList({
  onReportClick,
}: {
  onReportClick: () => void;
}) {
  return (
    <>
      <p className="text-[22px] font-bold">{`댓글 (${COMMENTS.length})`}</p>
      {COMMENTS.map((comment) => (
        <div
          key={comment.id}
          className="min-h-[128px] w-[1308px] border-b border-b-[#2B2926]/50 p-5"
        >
          <div className="flex items-center justify-between">
            <WriterInfo name={comment.name} postedAt={comment.postedAt} />
            <MeatballsMenu
              options={[
                { id: '1', label: '수정', type: 'comment' },
                { id: '2', label: '삭제', type: 'comment' },
                { id: '3', label: '신고하기', type: 'comment' },
              ]}
              onReportClick={onReportClick}
            />
          </div>
          <div className="pt-6 pb-1 text-[16px] font-medium">
            {comment.content}
          </div>
        </div>
      ))}
    </>
  );
}
