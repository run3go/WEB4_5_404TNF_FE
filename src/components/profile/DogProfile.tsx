import Card from '../common/Card';
import Icon from '../common/Icon';
import DogProfileCard from './DogProfileCard';

export default function DogProfile() {
  return (
    <div className="mb-20">
      <h2 className="mb-7 text-2xl text-[var(--color-primary-500)]">
        댕댕이 프로필
      </h2>
      <div className="flex gap-14">
        <DogProfileCard />
        <Card className="card__hover flex w-150 items-center justify-center p-0">
          <Icon width="47px" height="47px" left="-26px" top="-242px" />
        </Card>
      </div>
    </div>
  );
}
