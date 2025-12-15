<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <h2>®️ Регистрация</h2>
      <p class="subtitle">Создайте тестовый аккаунт любой роли</p>

      <el-form label-position="top">
        
        <el-form-item label="ФИО">
          <el-input v-model="form.fullname" placeholder="Иванов Иван" />
        </el-form-item>

        <el-form-item label="Придумайте логин">
          <el-input v-model="form.username" placeholder="user123" />
        </el-form-item>

        <el-form-item label="Пароль">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="Выберите роль (для теста)">
          <el-select v-model="form.role" placeholder="Кто вы?" style="width: 100%">
            <el-option label="👨‍🎓 Ученик (Student)" value="student" />
            <el-option label="👨‍🏫 Учитель (Teacher)" value="teacher" />
            <el-option label="👔 Менеджер (Manager)" value="manager" />
            <el-option label="😎 Админ (Admin)" value="admin" />
          </el-select>
        </el-form-item>

        <el-button type="primary" class="w-100" @click="handleRegister">
          Создать аккаунт
        </el-button>

        <div class="link">
          Уже есть аккаунт? <router-link to="/login">Войти</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

const form = reactive({
  fullname: '',
  username: '',
  password: '',
  role: 'student' // По умолчанию ученик
});

const handleRegister = () => {
  // ИМИТАЦИЯ РЕГИСТРАЦИИ (БЕЗ БЭКЕНДА)
  // Мы сохраняем данные "понарошку" в браузер, чтобы Логин их увидел
  
  const fakeUser = {
    username: form.username,
    password: form.password,
    role: form.role,
    fullname: form.fullname
  };

  // Сохраняем в localStorage (временная база данных браузера)
  localStorage.setItem('test_user', JSON.stringify(fakeUser));

  ElMessage.success(`Пользователь ${form.role} создан! Теперь войдите.`);
  router.push('/login');
};
</script>

<style scoped>
.auth-page { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; }
.auth-card { width: 400px; }
.subtitle { color: gray; margin-bottom: 20px; font-size: 14px; }
.w-100 { width: 100%; margin-top: 10px; font-weight: bold; }
.link { text-align: center; margin-top: 15px; font-size: 14px; }
</style>