// get pet list
export const getPetsByUserId = async (userId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile/v1/pet/${userId}`;
  console.log(url);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// create life record
export const createDiary = async (body: DiarydPayload) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/life-record/v2/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
