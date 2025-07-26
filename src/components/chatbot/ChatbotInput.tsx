export default function ChatbotInput({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (value: string) => void;
}) {
  return (
    <div className="mt-6 flex justify-between text-sm">
      <input
        className="w-16/20 rounded-[12px] bg-[var(--color-background)] px-4 py-2 focus:outline-[var(--color-primary-500)]"
        id="chatbot"
        type="text"
        value={value}
        autoComplete="off"
        placeholder="질문을 입력해주세요"
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        className="w-3/20 cursor-pointer rounded-[12px] bg-[var(--color-primary-300)] p-2 transition-colors hover:bg-[var(--color-primary-500)]"
        type="submit"
      >
        전송
      </button>
    </div>
  );
}
