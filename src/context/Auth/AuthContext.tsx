import { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authReducer, AuthState } from './authReducer';

import { publicApi, privateApi } from '../../api/propertiesApi';

import {
  LoginData,
  LoginResponse,
  ResetPassword,
} from '../../interfaces/appInterfaces';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: LoginResponse | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  login: (data: LoginData) => void;
  logout: () => void;
  removeError: () => void;
  recover: (email: string) => Promise<number>;
  resetPassword: (data: ResetPassword) => Promise<number>;
  updatePicture: (avatar: string) => void;
  deleteUser: () => void;
  updateUser: (userData: {
    firstname: string;
    lastname: string;
    email: string;
  }) => void;
};

const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: ''
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('refres-token');

    if (token) {
      try {
        const {data} = await publicApi.put<LoginResponse>('/auth/renewToken', {
            token
          }
        );

        dispatch({
          type: 'login',
          payload: { token: data.accessToken, user: { ...data } }
        });

        await AsyncStorage.setItem('token', data.accessToken);
        await AsyncStorage.setItem('refres-token', data.refreshToken);
        return;
      } catch (error) {
        console.log(error);
        dispatch({ type: 'notAuthenticated' });
      }
    }

    dispatch({ type: 'notAuthenticated' });
  };

  const login = async ({ email, password }: LoginData) => {
    try {
      const { data } = await publicApi.post<LoginResponse>('/auth/login', {
        email,
        password
      });
      dispatch({
        type: 'login',
        payload: { token: data.accessToken, user: { ...data } }
      });

      await AsyncStorage.setItem('token', data.accessToken);
      await AsyncStorage.setItem('refres-token', data.refreshToken);
    } catch (error: any) {
      console.log(error.response.data.message);

      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Información incorrecta'
      });
    }
  };

  const logout = async () => {
    try {
      await publicApi.delete('/auth/logout', {
        data: { token: state.user?.accessToken || '' }
      });
      await AsyncStorage.clear();

      dispatch({ type: 'logout' });
    } catch (error) {
      console.log(error);
    }
  };

  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  const recover = async (email: string) => {
    try {
      const { data } = await publicApi.put('/auth/sendPasswordRecoveryCode', {
        email
      });

      return 200;
    } catch (error: any) {
      console.log(error.response.data);

      dispatch({
        type: 'addError',
        payload: error.response.data || 'Información incorrecta'
      });

      return 400;
    }
  };

  const resetPassword = async ({
    email,
    recoveryCode,
    newPassword
  }: ResetPassword) => {
    try {
      const { data } = await publicApi.put('/auth/resetLostPassword', {
        email,
        recoveryCode,
        newPassword
      });

      return 200;
    } catch (error: any) {
      console.log(error.response.data);

      dispatch({
        type: 'addError',
        payload: error.response.data || 'Información incorrecta'
      });

      return 400;
    }
  };

  const updatePicture = (avatar: string) => {
    dispatch({ type: 'updatePicture', payload: { avatar } });
  };

  const updateUser = (userData: {
    firstname: string;
    lastname: string;
    email: string;
  }) => {
    dispatch({ type: 'updateUser', payload: { user: userData } });
  };

  const deleteUser = async () => {
    try {
      await privateApi.delete(`/users/${state.user?.userId}`);
      dispatch({ type: 'logout' });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        removeError,
        recover,
        resetPassword,
        updatePicture,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
