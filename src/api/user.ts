const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUserProfile = async (userId: string) => {
  try {
    const response = await fetch(`${baseURL}/api/profile/v1/${userId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};
