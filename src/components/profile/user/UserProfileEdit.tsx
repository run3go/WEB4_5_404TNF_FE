import { modifyUserInfo, resignAccount } from '@/api/user';
import defaultProfile from '@/assets/images/default-profile.svg';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import NicknameField from './NicknameField';
import PasswordField from './PasswordField';

export default function UserProfileEdit({
  closeModal,
  profile,
}: {
  closeModal: () => void;
  profile: UserProfile;
}) {
  const [imageUrl, setImageUrl] = useState(profile.userImg || defaultProfile);
  const [formData, setFormData] = useState<{
    image: File | null;
    nickname: string;
    password: string;
  }>({
    image: null,
    nickname: '',
    password: '',
  });

  const onSubmit = async () => {
    await modifyUserInfo(formData);
    closeModal();
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newImageUrl = window.URL.createObjectURL(e.target.files[0]);
    setImageUrl(newImageUrl);
    setFormData((prev) => ({
      ...prev,
      image: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleResign = async () => {
    await resignAccount(String(profile.userId));
  };
  console.log(profile.provider);
  return (
    <>
      <div
        className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
        onClick={closeModal}
      />
      <div className="scrollbar-hidden absolute top-1/2 left-1/2 z-201 h-9/10 w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] px-28 py-14">
        <Icon
          onClick={closeModal}
          className="absolute top-10 right-[70px] cursor-pointer"
          width="16px"
          height="16px"
          left="-302px"
          top="-202px"
        />
        <form
          className="relative flex flex-col items-center"
          onSubmit={onSubmit}
        >
          <label
            className="group mb-10 flex cursor-pointer flex-col items-center gap-4"
            htmlFor="userImage"
          >
            <Image
              className="h-30 w-30 rounded-full object-cover"
              src={imageUrl}
              alt="강아지 프로필"
              width={120}
              height={120}
            />
            <span className="text-[var(--color-grey)] group-hover:text-[var(--color-black)]">
              사진 선택하기
            </span>
          </label>
          <input
            id="userImage"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImage}
          />
          <div className="flex w-full gap-20">
            <div className="flex basis-1/2 flex-col gap-5">
              <span>이메일</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex basis-1/2 flex-col gap-5">
              <span>가입유형</span>
              <span>{profile.provider}</span>
            </div>
          </div>
          <div className="mt-11 flex w-full gap-20">
            <div className="mb-7 basis-1/2">
              <label className="mb-2 block" htmlFor="name">
                이름
              </label>
              <span>{profile.name}</span>
            </div>
            <NicknameField
              nickname={profile.nickname}
              onNicknameVerified={(value) =>
                setFormData((prev) => ({ ...prev, nickname: value }))
              }
            />
          </div>
          {profile.provider === 'local' && (
            <PasswordField
              onPasswordValid={(value) =>
                setFormData((prev) => ({ ...prev, password: value }))
              }
            />
          )}
          <Button className="mt-15 w-50" type="button" onClick={onSubmit}>
            수정하기
          </Button>
          <button
            type="button"
            className="absolute -right-17 -bottom-8 cursor-pointer text-[var(--color-grey)] transition-colors hover:text-[var(--color-black)]"
            onClick={handleResign}
          >
            회원 탈퇴
          </button>
        </form>
      </div>
    </>
  );
}
