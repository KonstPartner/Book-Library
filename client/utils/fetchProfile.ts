import { USER_PROFILE_URL } from '@/constants/apiSources';
import fetchData from './fetchData';

const fetchProfile = async (accessToken: string, refreshToken: string) => {
  try {
    const response = await fetchData(USER_PROFILE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      user: { ...response.data },
      accessToken,
      refreshToken,
    };
  } catch {
    return null;
  }
};

export default fetchProfile;
