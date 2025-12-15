// src/api/index.js
import axios from 'axios';

// Укажи здесь адрес твоего FastAPI сервера
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Или твой реальный IP
  headers: {
    'Content-Type': 'application/json',
  },
});

// Автоматически подставляем токен, если он есть
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;