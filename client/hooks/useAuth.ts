'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, selectAuth } from '@/redux/slices/authSlice';
import { AppDispatchType } from '@/types/ReduxTypes';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const authState = useSelector(selectAuth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
      setIsInitialized(true);
    }
  }, [dispatch, isInitialized]);

  return authState;
};

export default useAuth;
