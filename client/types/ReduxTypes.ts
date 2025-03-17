import store from '@/redux/store';

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export type AuthStateType = {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  accessToken: string | null;
};
