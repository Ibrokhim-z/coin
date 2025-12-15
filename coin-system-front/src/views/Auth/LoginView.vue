<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <h2>🔐 Вход в систему</h2>

      <el-form label-position="top" @submit.prevent="handleLogin">
        <el-form-item label="Логин">
          <el-input v-model="username" placeholder="Введите логин" />
        </el-form-item>

        <el-form-item label="Пароль">
          <el-input v-model="password" type="password" show-password />
        </el-form-item>

        <el-button type="primary" class="w-100" @click="handleLogin" :loading="loading">
          Войти
        </el-button>
        
        <div class="link">
          Нет аккаунта? <router-link to="/register">Создать тестовый</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = () => {
  loading.value = true;

  setTimeout(() => {
    // 1. Пытаемся найти пользователя, которого мы только что создали в Регистрации
    const savedUserJson = localStorage.getItem('test_user');
    let userRole = 'student'; // Если не нашли, по умолчанию пустим как ученика

    if (savedUserJson) {
      const savedUser = JSON.parse(savedUserJson);
      // Простая проверка (для теста): совпадает ли логин?
      if (savedUser.username === username.value) {
        userRole = savedUser.role;
      }
    }

    // 2. ЛОГИКА ПЕРЕНАПРАВЛЕНИЯ (Traffic Controller) 🚦
    // Здесь мы решаем, куда кого послать
    
    if (userRole === 'admin') {
      router.push('/admin'); // Директора -> в Админку
      ElMessage.success('Добро пожаловать, Шеф!');
    } 
    else if (userRole === 'teacher') {
      router.push('/teacher'); // Учителя -> к Группам
      ElMessage.success('Здравствуйте, учитель!');
    } 
    else if (userRole === 'manager') {
      router.push('/manager'); // Менеджера -> к Заказам
      ElMessage.success('Удачной работы в магазине!');
    } 
    else {
      router.push('/shop'); // Учеников -> в Магазин
      ElMessage.success('Привет! Готов тратить коины?');
    }

    loading.value = false;
  }, 1000); // Небольшая задержка для красоты
};
</script>

<style scoped>
.auth-page { display: flex; justify-content: center; align-items: center; height: 100vh; background: #eef1f6; }
.auth-card { width: 380px; padding: 20px; }
.w-100 { width: 100%; font-size: 16px; padding: 12px; }
.link { text-align: center; margin-top: 20px; }
</style>