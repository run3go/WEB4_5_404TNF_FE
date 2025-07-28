import { resignAccount } from '@/api/user';
import defaultProfile from '@/assets/images/default-profile.svg';
import Confirm from '@/components/common/Confirm';
import { Toast } from '@/components/common/Toast';
import {
  useModifyUserMutation,
  useUserProfile,
} from '@/lib/hooks/profile/useProfiles';
import { usePassword } from '@/lib/hooks/usePassword';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import Icon from '../../common/Icon';
import MobileTitle from '../../common/MobileTitle';
import ImageField from '../ImageField';
import NicknameField from './NicknameField';
import PasswordField from './PasswordField';

export default function UserProfileEditMobile() {
  const router = useRouter();

  const profileStore = useProfileStore();
  const userInfo = useAuthStore((state) => state.userInfo);
  const { data: profile } = useUserProfile(String(userInfo?.userId), true);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile?.imgUrl);
  const [formData, setFormData] = useState<UserFormdata>({
    image: null,
    nickname: userInfo!.nickname,
    password: '',
  });

  const { mutate: modifyMutate } = useModifyUserMutation(
    userInfo,
    profileStore.toggleEditingUserProfile,
  );
  const passwordHook = usePassword((value) =>
    setFormData((prev) => ({ ...prev, password: value })),
  );

  const onSubmit = async () => {
    if (passwordHook.password && !passwordHook.isMatched) {
      alert('현재 비밀번호가 일치하는지 확인해주세요');
      return;
    }
    if (!passwordHook.isConfirmMatched) {
      alert('새 비밀번호가 일치하지 않아요');
      return;
    }
    modifyMutate(formData);
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
    try {
      await resignAccount();
      router.push('/');
    } catch (err) {
      console.error(err);
      Toast.error('회원 탈퇴에 실패했습니다!');
    } finally {
      Toast.success('회원 탈퇴에 성공했습니다!');
    }
  };

  if (!profile) return;
  return (
    <div className="w-screen">
      {isConfirmOpen && (
        <Confirm
          confirmText="탈퇴"
          description="정말 탈퇴하시겠습니까?"
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleResign}
        />
      )}
      <div className="relative h-full bg-[var(--color-background)] px-6 py-9 text-sm dark:bg-[var(--color-black)]">
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
          <ImageField
            alt="유저 프로필"
            image={imageUrl || profile.imgUrl || defaultProfile}
            isMobile
            handleImage={handleImage}
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
            className="mt-20 mb-6 cursor-pointer self-end text-[var(--color-grey)] hover:text-[var(--color-black)]"
            onClick={() => setIsConfirmOpen(true)}
          >
            회원 탈퇴
          </button>
        </form>
      </div>
    </div>
  );
}
