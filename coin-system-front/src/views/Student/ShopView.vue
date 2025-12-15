<template>
  <div class="shop-page">
    <div class="balance-card">
      <div class="balance-info">
        <span>Твой баланс:</span>
        <h1 class="coins">{{ myBalance }} 🪙</h1>
      </div>
      <el-button type="primary" round size="small">История покупок</el-button>
    </div>

    <h3 class="section-title">Доступные товары</h3>
    
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image" :style="{ backgroundColor: product.color }">
          {{ product.icon }}
        </div>
        
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">{{ product.price }} 🪙</div>
          
          <button 
            class="buy-btn" 
            :disabled="myBalance < product.price"
            @click="buyItem(product)"
          >
            {{ myBalance < product.price ? 'Не хватает' : 'Купить' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// Имитация баланса ученика (потом будем брать из Pinia)
const myBalance = ref(150);

// Имитация товаров (загрузим с бэкенда позже)
const products = ref([
  { id: 1, name: 'Стикерпак', price: 50, icon: '😎', color: '#ff9a9e' },
  { id: 2, name: 'Ручка "Boss"', price: 100, icon: '🖊️', color: '#a18cd1' },
  { id: 3, name: 'Сертификат -ДЗ', price: 300, icon: '📜', color: '#84fab0' },
  { id: 4, name: 'Пицца (кусок)', price: 120, icon: '🍕', color: '#fccb90' },
  { id: 5, name: 'Билет в кино', price: 500, icon: '🎬', color: '#e0c3fc' },
  { id: 6, name: 'Футболка школы', price: 1000, icon: '👕', color: '#4facfe' },
]);

// Логика покупки
const buyItem = (item) => {
  ElMessageBox.confirm(
    `Ты хочешь купить "${item.name}" за ${item.price} монет?`,
    'Подтверждение',
    { confirmButtonText: 'Да, беру!', cancelButtonText: 'Нет', type: 'info' }
  ).then(() => {
    // Списываем монетки визуально
    if (myBalance.value >= item.price) {
      myBalance.value -= item.price;
      ElMessage.success(`Ура! Ты купил ${item.name}. Покажи это менеджеру.`);
    }
  });
};
</script>

<style scoped>
/* Стили специально под мобильный вид */
.shop-page {
  padding: 15px;
  max-width: 600px; /* Чтобы на компе не растягивалось слишком широко */
  margin: 0 auto;
}

.balance-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
}

.coins { margin: 5px 0 0 0; font-size: 28px; }

.section-title { margin-bottom: 15px; color: #333; }

/* CSS Grid - сетка товаров */
.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Две колонки */
  gap: 15px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.product-image {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}

.product-info { padding: 10px; text-align: center; }

.product-name { font-weight: bold; font-size: 14px; margin-bottom: 5px; }
.product-price { color: #666; font-size: 13px; margin-bottom: 10px; }

.buy-btn {
  width: 100%;
  padding: 8px;
  background: #409EFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.buy-btn:disabled {
  background: #eee;
  color: #999;
  cursor: not-allowed;
}
</style>