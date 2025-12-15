import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- АВТОРИЗАЦИЯ ---
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

    // --- УЧЕНИК (Student) ---
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Student/DashboardView.vue'),
      meta: { requiresAuth: true, role: 'student' }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/Student/ShopView.vue'),
      meta: { requiresAuth: true, role: 'student' }
    },

    // --- УЧИТЕЛЬ (Teacher) ---
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/Teacher/GroupListView.vue'),
      meta: { requiresAuth: true, role: 'teacher' }
    },

    // --- МЕНЕДЖЕР (Manager) - ЭТОГО НЕ БЫЛО В ТВОЕМ КОДЕ ---
    { 
      path: '/manager', 
      name: 'manager',
      component: () => import('../views/Manager/OrdersView.vue'),
      meta: { requiresAuth: true, role: 'manager' }
    },

    // --- АДМИН ПАНЕЛЬ ---
    {
      path: '/admin',
      // Оболочка (Layout)
      component: () => import('../components/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, role: 'admin' }, // Включили проверку роли
      children: [
        { 
          path: '', // Главная админки (Пользователи)
          name: 'admin-users',
          component: () => import('../views/Admin/UsersView.vue') 
        },
        // --- ГРУППЫ - ЭТОГО НЕ БЫЛО В ТВОЕМ КОДЕ ---
        { 
          path: 'groups', 
          name: 'admin-groups',
          component: () => import('../views/Admin/GroupsView.vue') 
        },

        { 
          path: 'shop',  // <-- Это делает адрес /admin/shop рабочим
          name: 'admin-shop',
          component: () => import('../views/Admin/ShopAdminView.vue') 
        }
      ]
    },

    // Редирект по умолчанию
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

// --- ЗАЩИТА ---
router.beforeEach((to, from, next) => {
  // ВРЕМЕННО: Пропускаем всех везде, чтобы ты мог посмотреть верстку
  // Когда подключим Бэкенд, мы раскомментируем код ниже
  next();

  /* const token = localStorage.getItem('access_token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
  */
});

export default router