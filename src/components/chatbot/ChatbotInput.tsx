import Icon from '../common/Icon';

export default function ChatbotInput({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (value: string) => void;
}) {
  return (
    <div className="absolute bottom-0 flex w-full justify-between rounded-b-[20px] border-t border-[var(--color-primary-500)] bg-[var(--color-background)] p-4 dark:bg-[var(--color-black)]">
      <input
        className="w-full pr-4 pl-2 focus:outline-none dark:text-[var(--color-background)] dark:placeholder:text-[var(--color-grey)]"
        id="chatbot"
        type="text"
        value={value}
        autoComplete="off"
        placeholder="질문을 입력해주세요"
        onChange={(e) => handleChange(e.target.value)}
      />
      <Icon
        className="cursor-pointer"
        width="23px"
        height="23px"
        left="-20px"
        top="-447px"
      />
    </div>
  );
}
