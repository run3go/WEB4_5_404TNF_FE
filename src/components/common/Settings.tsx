import ToggleButton from './ToggleButton';

export default function Settings() {
  return (
    <div className="fixed bottom-[20%] left-[10%] w-58 rounded-[20px] border border-[var(--color-primary-200)] bg-[var(--color-background)] px-7 py-6">
      <h2 className="mb-[31px] text-lg font-bold">Settings</h2>
      <div className="mb-7 flex items-center justify-between">
        <span>화면 모드</span>
        <ToggleButton id="mode" darkmode />
      </div>
      <div className="flex justify-between">
        <span>알림</span>
        <div className="w-6/10">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center justify-between">
              <span>전체</span>
              <ToggleButton id="all" />
            </li>
            <li className="flex items-center justify-between">
              <span>일정</span>
              <ToggleButton id="schedule" />
            </li>
            <li className="flex items-center justify-between">
              <span>서비스</span>
              <ToggleButton id="service" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
