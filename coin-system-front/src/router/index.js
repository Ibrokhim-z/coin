import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- ПУБЛИЧНЫЕ СТРАНИЦЫ ---
    { 
      path: '/login', 
      name: 'login', 
      component: LoginView 
    },
    { 
      path: '/register', 
      name: 'register', 
      component: () => import('../views/Auth/RegisterView.vue') 
    },

    // --- ЗАЩИЩЕННЫЕ МАРШРУТЫ ---
    
    // УЧЕНИК (Мобильная оболочка)
    {
      path: '/',
      component: () => import('../components/student/StudentLayout.vue'),
      meta: { requiresAuth: true, role: 'student' }, // <--- ВАЖНО
      children: [
        { path: 'dashboard', component: () => import('../views/Student/DashboardView.vue') },
        { path: 'shop', component: () => import('../views/Student/ShopView.vue') },
        { path: 'orders', component: () => import('../views/Student/OrdersView.vue') }
      ]
    },

    // УЧИТЕЛЬ
    { 
      path: '/teacher', 
      component: () => import('../views/Teacher/GroupListView.vue'),
      meta: { requiresAuth: true, role: 'teacher' }
    },

    // МЕНЕДЖЕР
    { 
      path: '/manager', 
      component: () => import('../views/Manager/OrdersView.vue'),
      meta: { requiresAuth: true, role: 'manager' }
    },

    // АДМИН
    {
      path: '/admin',
      component: () => import('../components/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        { path: '', component: () => import('../views/Admin/UsersView.vue') },
        { path: 'groups', component: () => import('../views/Admin/GroupsView.vue') },
        { path: 'shop', component: () => import('../views/Admin/ShopAdminView.vue') }
      ]
    },

    // Редирект по умолчанию
    { path: '/:pathMatch(.*)*', redirect: '/login' }
  ]
})

// --- ГЛОБАЛЬНАЯ ОХРАНА ---
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role');

  // 1. Если страница требует входа, а токена нет -> НА ВХОД
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } 
  // 2. Если уже вошли и пытаемся открыть Логин -> НЕЛЬЗЯ (кидаем в магазин/админку)
  else if ((to.path === '/login' || to.path === '/register') && token) {
    if (userRole === 'admin') next('/admin');
    else if (userRole === 'teacher') next('/teacher');
    else next('/dashboard');
  }
  // 3. Проверка ролей (чтобы ученик не зашел в админку)
  else if (to.meta.role && to.meta.role !== userRole && userRole !== 'admin') {
     // Если роль не совпадает - кидаем на "свое" место или логин
     next('/login');
  }
  else {
    next(); // Проходи!
  }
});

export default router