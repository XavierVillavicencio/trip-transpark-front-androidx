import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

// dev
//export const publicUrl = 'http://localhost:4000';
//export const privateUrl = 'http://localhost:3000';

// prod 
const publicUrl = 'https://auth.transpark.br-st.net';
export const privateUrl = 'https://app.transpark.br-st.net';

export const publicApi = axios.create({ baseURL: publicUrl });

export const privateApi = axios.create({ baseURL: privateUrl });
privateApi.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

publicApi.interceptors.request.use(
  AxiosLogger.requestLogger,
  AxiosLogger.errorLogger
);

// publicApi.interceptors.response.use(
//   AxiosLogger.responseLogger,
//   AxiosLogger.errorLogger
// );

privateApi.interceptors.request.use(
  AxiosLogger.requestLogger,
  AxiosLogger.errorLogger
);

// privateApi.interceptors.response.use(
//   AxiosLogger.responseLogger,
//   AxiosLogger.errorLogger
// );
