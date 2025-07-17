import { axiosInstance } from './axiosInstance';

// 월별 일정 조회
export const getSchedules = async (userId: string, date: string) => {
  try {
    const {
      data: { data },
    }: { data: { data: Schedule[] } } = await axiosInstance.get(
      `/api/v1/dashboard/${userId}/calendar`,
      {
        params: {
          userId,
          date,
        },
      },
    );

    return { data };
  } catch (err) {
    //  if ((err as AxiosError).isAxiosError) {
    //   const axiosErr = err as AxiosError<ErrorResponse>;
    //   if (axiosErr.response) {
    //     throw axiosErr.response.data;
    //   }
    // }
    // throw err;

    console.error(err);
  }
};

// 일정 삭제
// export const deleteSchedule = async () => {
//   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const res = await fetch(`${baseURL}`);

//   if (!res.ok) {
//     throw new Error('Failed to delete schedule');
//   }

//   return res.json();
// };
