'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, selectAuth } from '@/redux/slices/authSlice';
import { AppDispatchType } from '@/types/ReduxTypes';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const authState = useSelector(selectAuth);

  useEffect(() => {
    if (!authState.hasInitialized && !authState.loading) {
      dispatch(initializeAuth());
    }
  }, [dispatch, authState.hasInitialized, authState.loading]);

  return authState;
};

export default useAuth;
