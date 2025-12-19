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
      path: '/',
      component: () => import('../components/student/StudentLayout.vue'), // <-- НАША НОВАЯ ОБОЛОЧКА
      meta: { requiresAuth: true, role: 'student' },
      children: [
        {
          path: 'dashboard', // будет /dashboard
          component: () => import('../views/Student/DashboardView.vue')
        },
        {
          path: 'shop', // будет /shop
          component: () => import('../views/Student/ShopView.vue')
        },
        {
          path: 'orders', // будет /orders (НОВАЯ СТРАНИЦА)
          component: () => import('../views/Student/OrdersView.vue')
        }
      ]
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

// --- ГЛОБАЛЬНАЯ ЗАЩИТА МАРШРУТОВ ---
router.beforeEach((to, from, next) => {
  // 1. Смотрим, есть ли токен в кармане (localStorage)
  const token = localStorage.getItem('access_token');
  
  // 2. Если страница требует входа (requiresAuth), а токена нет
  if (to.meta.requiresAuth && !token) {
    // Стоп! Иди на логин
    next('/login');
  } 
  // 3. Если мы уже вошли (есть токен) и пытаемся зайти на Логин или Регистрацию
  else if ((to.path === '/login' || to.path === '/register') && token) {
    // Нечего там делать, иди сразу в магазин (или в зависимости от роли)
    // Пока просто кинем на главную, а там разберемся
    next('/shop'); 
  }
  else {
    // Всё ок, проходи
    next();
  }
});

export default router