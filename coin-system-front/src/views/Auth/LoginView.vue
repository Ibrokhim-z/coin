<template>
  <div class="login-wrapper">
    <div class="glass-container">
      <div class="header">
        <h1>Coin System 🪙</h1>
        <p>Вход в систему</p> </div>

      <el-form label-position="top" @submit.prevent="handleLogin" size="large">
        <el-form-item label="Логин">
          <el-input v-model="username" placeholder="Ваш логин" :prefix-icon="User" />
        </el-form-item>

        <el-form-item label="Пароль">
          <el-input v-model="password" type="password" placeholder="••••••••" show-password :prefix-icon="Lock" />
        </el-form-item>

        <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading" round>
          Войти
        </el-button>
        
        <div class="footer-links">
          <span class="text-gray">Нет аккаунта?</span>
          <router-link to="/register" class="link">Создать (Тест)</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
// ... (скрипт оставляем тот же, что был) ...
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import authApi from '@/api/auth';

const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
    // ... твой код входа ...
};
</script>

<style scoped>
/* Используем те же красивые стили, что я давал раньше, добавим только это: */
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
}
.glass-container {
  width: 100%; max-width: 380px; padding: 40px;
  background: rgba(255, 255, 255, 0.9); border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}
.header { text-align: center; margin-bottom: 30px; }
.login-btn { width: 100%; font-size: 16px; padding: 22px; margin-top: 10px; font-weight: bold; }

/* Стили для ссылки регистрации, чтобы она не отвлекала */
.footer-links { margin-top: 25px; text-align: center; font-size: 14px; }
.text-gray { color: #999; margin-right: 5px; }
.link { color: #c73bd4; text-decoration: none; font-weight: 600; }
.link:hover { text-decoration: underline; }
</style>