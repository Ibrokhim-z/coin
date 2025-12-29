import axios from 'axios';

// Создаем "почтальона" для запросов
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Адрес твоего Бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// ПЕРЕХВАТЧИК ЗАПРОСОВ (Interceptor)
// Перед тем как отправить любой запрос, эта функция проверяет карманы
apiClient.interceptors.request.use((config) => {
  // Достаем токен из памяти
  const token = localStorage.getItem('access_token');
  
  // Если токен есть - приклеиваем его к запросу
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ПЕРЕХВАТЧИК ОТВЕТОВ (Обработка протухания)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если сервер сказал "401 Unauthorized" (Токен протух или неверный)
    if (error.response && error.response.status === 401) {
      // Удаляем плохой токен
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_role');
      // Выкидываем на логин
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;