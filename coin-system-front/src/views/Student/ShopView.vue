<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import shopApi from '@/api/shop'; // <--- Импорт API
import userApi from '@/api/user'; // <--- Чтобы обновить баланс

const myBalance = ref(0);
const products = ref([]); // Изначально пустой список

// ЗАГРУЗКА ДАННЫХ ПРИ ОТКРЫТИИ СТРАНИЦЫ
onMounted(async () => {
  try {
    // 1. Грузим товары
    const shopRes = await shopApi.getItems();
    products.value = shopRes.data;

    // 2. Грузим профиль, чтобы узнать реальный баланс
    const userRes = await userApi.getProfile();
    myBalance.value = userRes.data.coins; // Предполагаю поле coins в ответе

  } catch (e) {
    console.error(e);
    ElMessage.error('Не удалось загрузить данные');
  }
});

const buyItem = (item) => {
  if (myBalance.value < item.price) return;

  ElMessageBox.confirm(
    `Купить "${item.name}" за ${item.price}?`,
    'Подтверждение',
    { type: 'success', confirmButtonText: 'Беру!' }
  ).then(async () => {
    try {
      // РЕАЛЬНАЯ ПОКУПКА
      await shopApi.buyItem(item.id);
      
      ElMessage.success('Куплено!');
      
      // Обновляем баланс после покупки
      myBalance.value -= item.price; 
      
    } catch (e) {
      ElMessage.error('Ошибка покупки');
    }
  });
};
</script>