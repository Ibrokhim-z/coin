<template>
  <div class="dashboard">
    <el-card class="profile-card">
      <div class="avatar-area">🤠</div>
      <div class="info">
        <h2>Привет, {{ studentName }}!</h2>
        <p>Группа: English 15:00</p>
      </div>
      <div class="stats">
        <div class="stat-item">
          <span class="label">Баланс</span>
          <span class="value">{{ balance }} 🪙</span>
        </div>
        <div class="stat-item">
          <span class="label">Рейтинг</span>
          <span class="value">#5</span>
        </div>
      </div>
    </el-card>

    <h3>📜 История активности</h3>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in history"
        :key="index"
        :type="activity.type === 'income' ? 'success' : 'primary'"
        :color="activity.type === 'income' ? '#0bbd87' : '#f56c6c'"
        :timestamp="activity.date"
        placement="top"
      >
        <el-card shadow="hover">
          <h4>{{ activity.title }}</h4>
          <p>{{ activity.comment }}</p>
          <div class="amount" :class="activity.type">
            {{ activity.type === 'income' ? '+' : '-' }}{{ activity.amount }} 🪙
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const studentName = ref('Иванов Иван');
const balance = ref(150);

const history = ref([
  { date: '15.12.2025 14:30', title: 'Получено от Mr. Smith', comment: 'За отличный ответ у доски', amount: 5, type: 'income' },
  { date: '14.12.2025 18:00', title: 'Покупка в магазине', comment: 'Ручка Boss', amount: 100, type: 'expense' },
  { date: '12.12.2025 15:10', title: 'Получено от Mr. Smith', comment: 'Домашняя работа', amount: 10, type: 'income' },
]);
</script>

<style scoped>
.dashboard { padding: 15px; max-width: 600px; margin: 0 auto; }
.profile-card { margin-bottom: 20px; background: linear-gradient(to right, #ece9e6, #ffffff); }
.stats { display: flex; justify-content: space-around; margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px; }
.stat-item { display: flex; flex-direction: column; align-items: center; }
.stat-item .value { font-size: 20px; font-weight: bold; color: #409EFF; }
.amount { font-weight: bold; font-size: 16px; margin-top: 5px; }
.amount.income { color: green; }
.amount.expense { color: red; }
.avatar-area { font-size: 40px; text-align: center; margin-bottom: 10px; }
</style>