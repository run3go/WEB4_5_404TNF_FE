const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// 월별 일정 조회
export const getSchedules = async (date: string) => {
  const url = `${baseUrl}/api/schedule/v2/calendar?date=${date}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load schedule');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 일정 삭제
export const deleteSchedule = async (
  scheduleId: number,
  cycleLink: boolean,
) => {
  const url = `${baseUrl}/api/schedule/v2/calendar/delete?scheduleId=${scheduleId}&cycleLink=${cycleLink}`;

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to delete schedule');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 일정 수정
export const editSchedule = async (updateSchedule: UpdateSchedule) => {
  const url = `${baseUrl}/api/schedule/v2/calendar`;

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scheduleId: updateSchedule.scheduleId,
        petId: updateSchedule.petId,
        name: updateSchedule.name,
        date: updateSchedule.date,
        cycleLink: updateSchedule.cycleLink,
        cycle: updateSchedule.cycle,
        cycleEnd: updateSchedule.cycleEnd,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to edit schedule');
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 일정 등록
export const createSchedule = async (createSchedule: CreateSchedule) => {
  const url = `${baseUrl}/api/schedule/v2/calendar`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        petId: createSchedule.petId,
        name: createSchedule.name,
        date: createSchedule.date,
        cycle: createSchedule.cycle,
        cycleEnd: createSchedule.cycleEnd,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to add schedule');
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 애완견 정보 조회
export const getPets = async (userId: number) => {
  const url = `${baseUrl}/api/profile/v1/users/${userId}/pet`;

  try {
    const res = await fetch(url, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to load pet data');
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};
