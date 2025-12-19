import apiClient from './index';

export default {
  // GET /users/me
  getProfile() {
    return apiClient.get('/users/me');
  },
  
  // GET /users/leaderboard
  getLeaderboard() {
    return apiClient.get('/users/leaderboard');
  },
  
  // GET /users/students (Для учителя)
  getStudents() {
    return apiClient.get('/users/students');
  }
};