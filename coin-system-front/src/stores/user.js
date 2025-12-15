// src/stores/user.js
import { defineStore } from 'pinia'
import apiClient from '@/api' 

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,         // Здесь будет лежать объект пользователя (id, role, name)
    token: localStorage.getItem('access_token') || null, // Берем токен из памяти браузера
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, // Проверка: вошел ли юзер?
    isAdmin: (state) => state.user?.role === 'admin', // Проверка: админ ли это?
  },

  actions: {
    // Действие ВХОДА
    async login(username, password) {
      try {
        // 1. Отправляем логин/пароль на бэкенд
        // (Убедись, что на бэкенде путь именно /auth/token или поправь тут)
        const response = await apiClient.post('/auth/token', { 
          username, 
          password 
        });

        // 2. Получаем токен
        const { access_token, user_data } = response.data;
        
        // 3. Сохраняем в Pinia и в localStorage (чтобы не вылетало при обновлении страницы)
        this.token = access_token;
        this.user = user_data;
        localStorage.setItem('access_token', access_token);
        
        // 4. Возвращаем роль, чтобы знать, куда редиректить (в админку или магазин)
        return user_data.role; 

      } catch (error) {
        console.error('Ошибка входа:', error);
        throw error;
      }
    },

    // Действие ВЫХОДА
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('access_token');
      // Можно сделать редирект на логин тут, или в компоненте
      window.location.href = '/login'; 
    }
  }
})