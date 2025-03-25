const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ALL_BOOKS_URL = `${API_BASE_URL}/books`;
export const RANDOM_BOOKS_URL = `${API_BASE_URL}/books/random`;

export const ALL_RATINGS_URL = `${API_BASE_URL}/ratings`;

export const ALL_USERS_URL = `${API_BASE_URL}/users`;

export const USER_PROFILE_URL = `${ALL_USERS_URL}/profile`;

export const REGISTER_USER_URL = `${ALL_USERS_URL}/register`;

export const LOGIN_USER_URL = `${ALL_USERS_URL}/login`;

export const REFRESH_ACCESS_TOKEN_URL = `${ALL_USERS_URL}/refresh`;

export const CHANGE_PASSWORD_URL = `${ALL_USERS_URL}/change-password`;