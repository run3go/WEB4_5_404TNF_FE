import { modifyUserInfo, resignAccount } from '@/api/user';
import defaultProfile from '@/assets/images/default-profile.svg';
import Button from '@/components/common/Button';
import Confirm from '@/components/common/Confirm';
import Icon from '@/components/common/Icon';
import { Toast } from '@/components/common/Toast';
import { usePassword } from '@/lib/hooks/usePassword';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import ImageField from '../ImageField';
import NicknameField from './NicknameField';
import PasswordField from './PasswordField';

export default function UserProfileEdit({
  closeModal,
  profile,
}: {
  closeModal: () => void;
  profile: UserProfile;
}) {
  const router = useRouter();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(profile.imgUrl);
  const [formData, setFormData] = useState<{
    image: File | null;
    nickname: string;
    password: string;
  }>({
    image: null,
    nickname: profile.nickname,
    password: '',
  });

  const passwordHook = usePassword((value) =>
    setFormData((prev) => ({ ...prev, password: value })),
  );
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    if (passwordHook.password && !passwordHook.isMatched) {
      Toast.error('현재 비밀번호가 일치하는지 확인해주세요');
      return;
    }
    if (!passwordHook.isConfirmMatched) {
      Toast.error('새 비밀번호가 일치하지 않아요');
      return;
    }
    try {
      await modifyUserInfo(formData);
      await queryClient.invalidateQueries({
        queryKey: ['user', String(profile.userId)],
      });
      closeModal();
      Toast.success('유저 프로필이 수정되었습니다!');
    } catch (err) {
      if (err instanceof Error) {
        Toast.error(err.message);
      } else {
        Toast.error('유저 프로필 수정에 실패했습니다');
      }
    }
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
    router.push('/');
  };
  return (
    <>
      {isConfirmOpen && (
        <Confirm
          confirmText="탈퇴"
          description="정말 탈퇴하시겠습니까?"
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleResign}
        />
      )}
      <div
        className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
        onClick={closeModal}
      />
      <div className="scrollbar-hidden absolute top-1/2 left-1/2 z-201 h-8/10 w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] px-28 py-14 dark:bg-[#343434]">
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
          <ImageField
            alt="유저 프로필"
            image={imageUrl || defaultProfile}
            handleImage={handleImage}
          />
          <div className="flex w-full gap-20">
            <div className="flex basis-1/2 flex-col gap-5">
              <span>이메일</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex basis-1/2 flex-col gap-5">
              <span>가입유형</span>
              <div className="flex gap-2">
                <span>{profile.provider}</span>
                <Icon
                  className="scale-20"
                  width="20px"
                  height="20px"
                  left={
                    profile.provider === 'kakao'
                      ? '-244px'
                      : profile.provider === 'google'
                        ? '-281px'
                        : ''
                  }
                  top={profile.provider === 'local' ? '' : '-444px'}
                />
              </div>
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
              onNicknameVerified={(value) => {
                setFormData((prev) => ({ ...prev, nickname: value }));
              }}
              setAble={() => setIsDisabled(false)}
              setDisable={() => setIsDisabled(true)}
              isDisabled={isDisabled}
            />
          </div>
          {profile.provider === 'local' && (
            <PasswordField passwordHook={passwordHook} />
          )}
          <Button
            disabled={isDisabled}
            className="mt-15 w-50"
            type="button"
            onClick={onSubmit}
          >
            수정하기
          </Button>
          <button
            type="button"
            className="absolute -right-10 -bottom-8 cursor-pointer text-[var(--color-grey)] transition-colors hover:text-[var(--color-black)] dark:hover:text-[var(--color-background)]"
            onClick={() => setIsConfirmOpen(true)}
          >
            회원 탈퇴
          </button>
        </form>
      </div>
    </>
  );
}
