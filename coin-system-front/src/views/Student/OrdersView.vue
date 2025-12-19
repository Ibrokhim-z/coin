<template>
  <div class="orders-page">
    <h2 class="page-title">Мои заказы</h2>

    <div class="tabs">
      <div 
        class="tab" 
        :class="{ active: activeTab === 'active' }"
        @click="activeTab = 'active'"
      >
        В процессе ⏳
      </div>
      <div 
        class="tab" 
        :class="{ active: activeTab === 'history' }"
        @click="activeTab = 'history'"
      >
        Завершенные ✅
      </div>
    </div>

    <div class="orders-list">
      <div v-if="filteredOrders.length === 0" class="empty-state">
        Тут пока пусто 🍃
      </div>

      <div 
        v-for="order in filteredOrders" 
        :key="order.id" 
        class="order-card"
      >
        <div class="order-main">
          <div class="order-icon" :style="{ background: order.color }">
            {{ order.icon }}
          </div>
          <div class="order-info">
            <div class="item-name">{{ order.item }}</div>
            <div class="order-date">{{ order.date }}</div>
          </div>
        </div>

        <div class="order-status-block">
          <div class="price">-{{ order.price }} 🪙</div>
          
          <div v-if="order.status === 'waiting'" class="status-badge waiting">
            Ждем подтверждения
          </div>
          <div v-else-if="order.status === 'ready'" class="status-badge ready">
            Можно забирать!
          </div>
          <div v-else class="status-badge done">
            Получено
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('active');

const orders = ref([
  { id: 1, item: 'Ручка Boss', price: 100, date: 'Сегодня, 14:30', status: 'ready', icon: '🖊️', color: '#46e37b20' },
  { id: 2, item: 'Пицца', price: 120, date: 'Сегодня, 10:00', status: 'waiting', icon: '🍕', color: '#fccb9020' },
  { id: 3, item: 'Стикерпак', price: 50, date: '12.12.2025', status: 'completed', icon: '😎', color: '#c73bd420' },
  { id: 4, item: 'Билет в кино', price: 500, date: '10.12.2025', status: 'completed', icon: '🎬', color: '#a18cd120' },
]);

const filteredOrders = computed(() => {
  if (activeTab.value === 'active') {
    return orders.value.filter(o => o.status === 'waiting' || o.status === 'ready');
  }
  return orders.value.filter(o => o.status === 'completed');
});
</script>

<style scoped>
.orders-page { padding: 20px; max-width: 600px; margin: 0 auto; }
.page-title { margin: 0 0 20px; font-size: 24px; color: #2c3e50; }

/* Вкладки */
.tabs { display: flex; background: white; padding: 5px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.tab {
  flex: 1; text-align: center; padding: 10px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; color: #7f8c8d; transition: all 0.3s;
}
.tab.active { background: #c73bd4; color: white; shadow: 0 2px 5px rgba(199, 59, 212, 0.3); }

/* Карточка заказа */
.order-card {
  background: white; border-radius: 16px; padding: 15px; margin-bottom: 15px;
  display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid transparent;
}
/* Если готово к выдаче - подсветим рамку зеленым */
.order-card:has(.ready) { border-color: #46e37b; background: #fafffc; }

.order-main { display: flex; align-items: center; gap: 15px; }
.order-icon { width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.item-name { font-weight: 700; color: #2c3e50; font-size: 15px; }
.order-date { font-size: 12px; color: #95a5a6; margin-top: 2px; }

.order-status-block { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
.price { font-weight: 700; font-size: 14px; margin-bottom: 5px; color: #2c3e50; }

/* Бейджи статусов */
.status-badge { font-size: 11px; padding: 4px 8px; border-radius: 6px; font-weight: 600; }
.waiting { background: #fff3cd; color: #856404; } /* Желтый */
.ready { background: #d4edda; color: #155724; animation: pulse 2s infinite; } /* Зеленый */
.done { background: #f8f9fa; color: #6c757d; } /* Серый */

.empty-state { text-align: center; padding: 40px; color: #bdc3c7; font-size: 18px; }

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(70, 227, 123, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(70, 227, 123, 0); }
  100% { box-shadow: 0 0 0 0 rgba(70, 227, 123, 0); }
}
</style>