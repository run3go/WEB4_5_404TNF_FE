import Icon from '@/components/common/Icon';

export default function VaccineModal() {
  return (
    <div className="h-[242px] w-90 rounded-[20px] border-4 border-[var(--color-primary-200)] px-7 py-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg leading-[1.2]">올해의 예방접종 기록</h3>
        <Icon width="16px" height="16px" left="-302px" top="-202px" />
      </div>
      <ul className="flex flex-col gap-[10px]">
        <li className="flex justify-between leading-[1.2]">
          <div>
            <Icon
              className="mr-2 inline-block"
              width="16px"
              height="14px"
              left="-26px"
              top="-79px"
            />
            <span>종합접종 1차</span>
          </div>
          <span>2025. 5. 12</span>
        </li>
        <li className="flex justify-between">
          <div>
            <Icon
              className="mr-2 inline-block"
              width="16px"
              height="14px"
              left="-26px"
              top="-79px"
            />
            <span>코로나장염 1차</span>
          </div>
          <span>2025. 5. 12</span>
        </li>
        <li className="flex justify-between">
          <div>
            <Icon
              className="mr-2 inline-block"
              width="16px"
              height="14px"
              left="-26px"
              top="-79px"
            />
            <span>켄넬코프 1차</span>
          </div>
          <span>2025. 5. 12</span>
        </li>
        <li className="flex justify-between">
          <div>
            <Icon
              className="mr-2 inline-block"
              width="16px"
              height="14px"
              left="-26px"
              top="-79px"
            />
            <span>신종플루 1차</span>
          </div>
          <span>2025. 5. 12</span>
        </li>
        <li className="flex justify-between">
          <div>
            <Icon
              className="mr-2 inline-block"
              width="16px"
              height="14px"
              left="-26px"
              top="-79px"
            />
            <span>광견병 1차</span>
          </div>
          <span>2025. 5. 12</span>
        </li>
      </ul>
    </div>
  );
}
