import apiClient from './index';

export default {
  // POST /auth/login
  // Формат OAuth2 (FormData)
  login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    return apiClient.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  },

  // POST /users/ (Регистрация)
  register(userData) {
    // userData = { username, full_name, password, role, group_id }
    return apiClient.post('/users/', userData);
  }
};