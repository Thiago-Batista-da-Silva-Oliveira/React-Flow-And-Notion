import Axios from 'axios';
import { storage } from '../utils/storage';
import { API_URL } from '../config';
import { useNotificationStore } from '../stores/notifications';

function getToken() {
  const storagedToken = storage.getItem({
    key: 'token',
    storageType: 'local',
  });

  const sessionToken = storage.getItem({
    key: 'token',
    storageType: 'session',
  });

  if (storagedToken) {
    return {
      token: storagedToken?.token?.token,
      type: 'local',
    };
  }

  if (sessionToken) {
    return {
      token: sessionToken?.token?.token,
      type: 'session',
    };
  }

  return null;
}

async function authRequestInterceptor(config) {
  const sessionToken = getToken();
  const data = { ...config.data };
  config.data = data;
  config.headers.authorization = `Bearer ${sessionToken?.token}`;
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: 'http://localhost:3333/',
});

axios.interceptors.request.use(authRequestInterceptor, error => {
  Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Error with auth token'));
    }
    if (error) {
      const message = error.response?.data?.message || error.message;
      useNotificationStore
        .getState()
        .addNotification({ type: 'error', title: 'Erro', message });
    }
    return Promise.reject(error);
  },
);
