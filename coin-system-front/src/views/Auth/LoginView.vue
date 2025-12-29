<template>
  <div class="auth-container">
    <div class="circle c1"></div>
    <div class="circle c2"></div>

    <div class="glass-card auth-card">
      <div class="header">
        <h1>EduCoins 🪙</h1>
        <p>Вход в систему</p>
      </div>
      
      <el-form label-position="top" @submit.prevent="handleLogin" size="large">
        <el-form-item label="Логин">
          <el-input v-model="username" placeholder="Ваш логин" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="password" type="password" show-password placeholder="••••••••" />
        </el-form-item>

        <el-button type="primary" class="submit-btn" @click="handleLogin" :loading="loading" round>
          Войти
        </el-button>

        <div class="footer">
          Нет аккаунта? <router-link to="/register" class="link-text">Регистрация</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import authApi from '@/api/auth';

const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if(!username.value || !password.value) return ElMessage.warning('Введите логин и пароль');

  loading.value = true;
  try {
    const response = await authApi.login(username.value, password.value);
    const { access_token, role } = response.data;

    // Сохраняем токен
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user_role', role);

    ElMessage.success('Добро пожаловать!');

    // Навигация
    if (role === 'admin') router.push('/admin');
    else if (role === 'teacher') router.push('/teacher');
    else if (role === 'manager') router.push('/manager');
    else router.push('/dashboard'); 

  } catch (error) {
    console.error(error);
    ElMessage.error('Неверный логин или пароль');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  height: 100vh; display: flex; justify-content: center; align-items: center;
  background: #f0f2f5; position: relative; overflow: hidden;
}

/* Плавающие круги */
.circle { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.6; z-index: 0; }
.c1 { width: 300px; height: 300px; background: #c73bd4; top: -50px; left: -50px; animation: float 6s infinite ease-in-out; }
.c2 { width: 250px; height: 250px; background: #46e37b; bottom: -50px; right: -50px; animation: float 8s infinite ease-in-out reverse; }

.auth-card { position: relative; z-index: 1; width: 100%; max-width: 380px; padding: 40px; }
.header { text-align: center; margin-bottom: 30px; }
.header h1 { margin: 0; background: linear-gradient(45deg, #c73bd4, #667eea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.header p { margin: 5px 0 0; color: #95a5a6; font-size: 14px; }
.submit-btn { width: 100%; height: 50px; font-weight: bold; font-size: 16px; margin-top: 10px; }
.footer { text-align: center; margin-top: 25px; font-size: 14px; color: #7f8c8d; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}
</style>