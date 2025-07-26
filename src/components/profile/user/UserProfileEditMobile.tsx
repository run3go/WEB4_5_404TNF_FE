import { modifyUserInfo, resignAccount } from '@/api/user';
import defaultProfile from '@/assets/images/default-profile.svg';
import { usePassword } from '@/lib/hooks/usePassword';
import { useUserProfile } from '@/lib/hooks/useProfiles';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import Icon from '../../common/Icon';
import MobileTitle from '../../common/MobileTitle';
import NicknameField from './NicknameField';
import PasswordField from './PasswordField';

export default function UserProfileEditMobile() {
  const profileStore = useProfileStore();
  const userInfo = useAuthStore((state) => state.userInfo);
  const { data: profile } = useUserProfile(String(userInfo?.userId), true);
  const [imageUrl, setImageUrl] = useState(profile?.imgUrl);
  const [formData, setFormData] = useState<{
    image: File | null;
    nickname: string;
    password: string;
  }>({
    image: null,
    nickname: userInfo!.nickname,
    password: '',
  });

  const passwordHook = usePassword((value) =>
    setFormData((prev) => ({ ...prev, password: value })),
  );
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    if (passwordHook.password && !passwordHook.isMatched) {
      alert('현재 비밀번호가 일치하는지 확인해주세요');
      return;
    }
    console.log(passwordHook.password, passwordHook.confirmPassword);
    if (!passwordHook.isConfirmMatched) {
      alert('새 비밀번호가 일치하지 않아요');
      return;
    }
    await modifyUserInfo(formData);
    await queryClient.invalidateQueries({
      queryKey: ['user', userInfo?.userId],
    });
    profileStore.toggleEditingUserProfile();
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
    await resignAccount();
  };

  if (!profile) return;
  return (
    <div className="w-screen">
      <div className="relative h-full bg-[var(--color-background)] px-6 py-9 text-sm">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <MobileTitle
            title="프로필 수정"
            onClick={() => {
              onSubmit();
            }}
            closePage={() => {
              profileStore.toggleEditingUserProfile();
            }}
          />
          <label
            className="group mb-9 flex cursor-pointer flex-col items-center gap-4 self-center"
            htmlFor="userImage"
          >
            <Image
              className="h-25 w-25 rounded-full object-cover"
              src={imageUrl || profile.imgUrl || defaultProfile}
              alt="유저 프로필"
              width={100}
              height={100}
              priority
            />
            <span className="text-[var(--color-grey)] group-hover:text-[var(--color-black)]">
              사진 선택하기
            </span>
          </label>
          <input
            className="hidden"
            id="userImage"
            type="file"
            onChange={handleImage}
          />
          <div className="mb-8 flex basis-1/2 flex-col gap-5">
            <span>이메일</span>
            <span>user@naver.com</span>
          </div>
          <div className="mb-8 flex basis-1/2 flex-col gap-5">
            <span>가입유형</span>
            <div className="flex items-center gap-2">
              <span>NAVER</span>
              <Icon width="20px" height="20px" left="-184px" top="-256px" />
            </div>
          </div>
          <div className="mb-5 flex basis-1/2 flex-col gap-5">
            <label className="block" htmlFor="name">
              이름
            </label>
            <span>홍길동</span>
          </div>
          <NicknameField
            nickname={profile.nickname}
            onNicknameVerified={(value) =>
              setFormData((prev) => ({ ...prev, nickname: value }))
            }
          />
          <PasswordField passwordHook={passwordHook} />
          <button
            type="button"
            className="mt-20 mb-6 self-end text-[var(--color-grey)]"
            onClick={handleResign}
          >
            회원 탈퇴
          </button>
        </form>
      </div>
    </div>
  );
}
