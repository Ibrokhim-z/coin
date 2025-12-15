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
.admin-layout { display: flex; height: 100vh; }
.sidebar { background-color: #304156; color: white; }
.logo { padding: 20px; font-size: 18px; font-weight: bold; color: white; text-align: center; border-bottom: 1px solid #1f2d3d; }
.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; }
</style>