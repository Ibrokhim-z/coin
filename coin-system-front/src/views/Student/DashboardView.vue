<template>
  <div class="dashboard-page">
    
    <div class="welcome-section">
      <h1>Привет, {{ studentName }}! 👋</h1>
      <p>Готов покорять вершины?</p>
    </div>

    <div class="stats-card">
      <div class="stat-box">
        <div class="label">Баланс</div>
        <div class="value green-text">{{ balance }} 🪙</div>
      </div>
      <div class="divider"></div>
      <div class="stat-box">
        <div class="label">Рейтинг</div>
        <div class="value">#5</div>
      </div>
    </div>

    <div class="quick-actions">
      <el-button type="success" class="shop-btn" @click="$router.push('/shop')">
        🛒 Перейти в магазин
      </el-button>
      <el-button type="danger" plain class="shop-btn" style="margin-top: 10px;" @click="handleLogout">
        Выйти из аккаунта
      </el-button>
    </div>

    <h3 class="history-title">История активности</h3>
    <div class="history-list">
      <div v-for="(item, i) in history" :key="i" class="history-item">
        <div class="icon-circle" :class="item.type">
          {{ item.type === 'income' ? '⬇️' : '🛍️' }}
        </div>
        <div class="details">
          <div class="title">{{ item.title }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="amount" :class="item.type">
          {{ item.type === 'income' ? '+' : '-' }}{{ item.amount }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const handleLogout = () => {
  // 1. Удаляем токен
  localStorage.removeItem('access_token');
  localStorage.removeItem('test_user'); // Если осталось старое
  
  // 2. Кидаем на вход
  router.push('/login');
};

const studentName = ref('Иванов Иван');
const balance = ref(150);

const history = ref([
  { date: 'Сегодня, 14:30', title: 'Ответ у доски', amount: 5, type: 'income' },
  { date: 'Вчера, 18:00', title: 'Покупка: Стикерпак', amount: 50, type: 'expense' },
  { date: '12.12.2025', title: 'Домашняя работа', amount: 10, type: 'income' },
]);
</script>

<style scoped>
.dashboard-page { padding: 25px; max-width: 600px; margin: 0 auto; }

.welcome-section h1 { margin: 0; font-size: 24px; color: #2c3e50; }
.welcome-section p { color: #7f8c8d; margin: 5px 0 20px; }

/* Карточка статистики - Белая со тенью */
.stats-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  margin-bottom: 25px;
}

.stat-box { text-align: center; }
.label { font-size: 13px; color: #95a5a6; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
.value { font-size: 28px; font-weight: 800; color: #2c3e50; }
.green-text { color: #46e37b; text-shadow: 0 2px 10px rgba(70, 227, 123, 0.3); } /* Светящийся зеленый текст */

.divider { width: 1px; height: 40px; background: #eee; }

.quick-actions { margin-bottom: 30px; }
.shop-btn { width: 100%; height: 50px; font-size: 16px; border-radius: 16px; }

.history-title { font-size: 18px; margin-bottom: 15px; }

/* Список истории */
.history-item {
  background: white;
  padding: 15px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

.icon-circle {
  width: 40px; height: 40px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-right: 15px; font-size: 18px;
}
.icon-circle.income { background: rgba(70, 227, 123, 0.15); } /* Бледно-зеленый фон */
.icon-circle.expense { background: rgba(199, 59, 212, 0.1); }

.details { flex-grow: 1; }
.title { font-weight: 600; font-size: 14px; margin-bottom: 3px; }
.date { font-size: 12px; color: #bdc3c7; }

.amount { font-weight: 700; font-size: 16px; }
.amount.income { color: #46e37b; } /* Зеленый плюс */
.amount.expense { color: #2c3e50; }
</style>