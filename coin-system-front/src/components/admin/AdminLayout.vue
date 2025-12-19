<template>
  <div class="admin-layout">
    <el-aside width="220px" class="sidebar">
      <div class="logo">Coin System 🪙</div>
      <el-menu
        router
        :default-active="$route.path"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/admin">
          <el-icon><User /></el-icon>
          <span>Пользователи</span>
        </el-menu-item>
        
        <el-menu-item index="/admin/groups">
          <el-icon><Calendar /></el-icon>
          <span>Группы</span>
        </el-menu-item>

        <el-menu-item index="/admin/shop">
          <el-icon><Goods /></el-icon>
          <span>Магазин</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <span>Панель администратора</span>
        <el-button type="danger" size="small" @click="logout">Выход</el-button>
      </el-header>
      
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* src/components/admin/AdminLayout.vue -> <style> */

.admin-layout { display: flex; height: 100vh; background: #f4f7fc; }

/* Сайдбар с градиентом */
.sidebar {
  background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%) !important;
  color: white;
  border-right: none;
  box-shadow: 4px 0 20px rgba(0,0,0,0.05);
}

.logo {
  padding: 30px 20px;
  font-size: 20px;
  font-weight: 800;
  color: white;
  text-align: center;
  letter-spacing: 1px;
  /* Градиентный текст для лого */
  background: linear-gradient(to right, #c73bd4, #46e37b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Меню items */
.el-menu { border-right: none !important; background: transparent !important; }

.el-menu-item {
  color: #a0aec0 !important;
  margin: 5px 10px;
  border-radius: 8px;
  transition: all 0.3s;
}

.el-menu-item:hover {
  background: rgba(255,255,255,0.1) !important;
  color: white !important;
}

/* Активный пункт меню - ТВОЙ ФИОЛЕТОВЫЙ */
.el-menu-item.is-active {
  background: var(--primary-color) !important; /* #c73bd4 */
  color: white !important;
  box-shadow: 0 4px 12px rgba(199, 59, 212, 0.4);
  font-weight: 600;
}

.header {
  background: white;
  border-bottom: 1px solid #eee;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}
</style>