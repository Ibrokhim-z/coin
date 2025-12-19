<template>
  <div class="student-layout">
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <div class="bottom-nav">
      <router-link to="/dashboard" class="nav-item" active-class="active">
        <div class="icon">🏠</div>
        <span>Главная</span>
      </router-link>

      <router-link to="/shop" class="nav-item" active-class="active">
        <div class="icon">🛒</div>
        <span>Магазин</span>
      </router-link>

      <router-link to="/orders" class="nav-item" active-class="active">
        <div class="icon">📦</div>
        <span>Заказы</span>
        <div v-if="hasReadyOrders" class="badge">!</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Имитация уведомления
const hasReadyOrders = ref(true); 
</script>

<style scoped>
.student-layout {
  min-height: 100vh;
  background-color: #f4f7fc;
  padding-bottom: 80px; /* Отступ, чтобы меню не закрывало контент */
}

/* Нижнее меню */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px); /* Эффект стекла */
  border-top: 1px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.03);
}

.nav-item {
  text-decoration: none;
  color: #95a5a6;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  position: relative;
  transition: all 0.3s;
  width: 60px;
}

.icon { font-size: 24px; margin-bottom: 2px; transition: transform 0.2s; }

/* Активное состояние */
.nav-item.active { color: #c73bd4; }
.nav-item.active .icon { transform: translateY(-3px); }

/* Бейдж уведомления */
.badge {
  position: absolute; top: -2px; right: 10px;
  width: 16px; height: 16px;
  background: #e74c3c; color: white;
  border-radius: 50%; border: 2px solid white;
  font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;
}

/* Анимация переходов между страницами */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>