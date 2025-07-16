export const getUserProfile = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/profile/v1/${userId}`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};
