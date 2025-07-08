import Card from '../common/Card';
import Icon from '../common/Icon';
import DogProfileCard from './DogProfileCard';

export default function DogProfile() {
  return (
    <div className="mb-20">
      <h2 className="mb-7 text-sm text-[var(--color-primary-500)] sm:text-2xl">
        댕댕이 프로필
      </h2>
      <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:gap-14">
        <DogProfileCard />
        <Card className="card__hover flex h-47 w-full max-w-150 items-center justify-center p-0 sm:h-[332px]">
          <Icon
            className="hidden sm:block"
            width="47px"
            height="47px"
            left="-26px"
            top="-242px"
          />
          <Icon
            className="block sm:hidden"
            width="20px"
            height="20px"
            left="-266px"
            top="-75px"
          />
        </Card>
      </div>
    </div>
  );
}
