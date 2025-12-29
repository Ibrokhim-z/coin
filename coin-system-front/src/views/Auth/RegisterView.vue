<template>
  <div class="auth-container">
    <div class="glass-card auth-card">
      <h2 class="title">Регистрация 🎓</h2>
      <p class="subtitle">Присоединяйся к системе мотивации</p>

      <el-form label-position="top" @submit.prevent="handleRegister" size="large">
        
        <el-form-item label="ФИО (Фамилия Имя)">
          <el-input v-model="form.full_name" placeholder="Иванов Иван" />
        </el-form-item>

        <el-form-item label="Придумайте логин">
          <el-input v-model="form.username" placeholder="ivan2025" />
        </el-form-item>

        <el-form-item label="Пароль">
          <el-input v-model="form.password" type="password" show-password placeholder="••••••••" />
        </el-form-item>

        <el-button type="primary" class="submit-btn" @click="handleRegister" :loading="loading" round>
          Создать аккаунт
        </el-button>

        <div class="footer">
          Уже есть аккаунт? <router-link to="/login" class="link-text">Войти</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import authApi from '@/api/auth';

const router = useRouter();
const loading = ref(false);

const form = reactive({
  full_name: '',
  username: '',
  password: '',
  role: 'student', // БЕЗОПАСНОСТЬ: Только ученик
  group_id: 1
});

const handleRegister = async () => {
  if(!form.username || !form.password || !form.full_name) {
    return ElMessage.warning('Пожалуйста, заполните все поля');
  }

  loading.value = true;
  try {
    await authApi.register(form);
    ElMessage.success('Успешно! Теперь войдите в систему.');
    router.push('/login');
  } catch (error) {
    if (error.response) {
       ElMessage.error(error.response.data.detail || 'Ошибка регистрации');
    } else {
       ElMessage.error('Нет соединения с сервером');
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex; justify-content: center; align-items: center;
  background: var(--bg-gradient);
  padding: 20px;
}
.auth-card { width: 100%; max-width: 400px; padding: 40px 30px; }
.title { text-align: center; margin: 0; color: #2c3e50; font-weight: 800; }
.subtitle { text-align: center; color: #95a5a6; margin-top: 5px; margin-bottom: 30px; font-size: 14px; }
.submit-btn { width: 100%; height: 48px; font-size: 16px; margin-top: 10px; }
.footer { text-align: center; margin-top: 25px; font-size: 14px; color: #7f8c8d; }
</style>