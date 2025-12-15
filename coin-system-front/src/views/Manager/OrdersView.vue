<template>
  <div class="manager-orders">
    <h2>📦 Управление заказами</h2>
    
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Новые заказы" name="new">
        <el-table :data="newOrders" border style="width: 100%">
          <el-table-column prop="id" label="№" width="50" />
          <el-table-column prop="student" label="Ученик" />
          <el-table-column prop="item" label="Товар" />
          <el-table-column prop="price" label="Цена" width="80" />
          <el-table-column label="Действие">
            <template #default="scope">
              <el-button type="success" size="small" @click="approveOrder(scope.row)">
                Подтвердить наличие
              </el-button>
              <el-button type="danger" size="small">Отмена</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="Готовы к выдаче" name="ready">
        <el-table :data="readyOrders" border style="width: 100%">
          <el-table-column prop="id" label="№" width="50" />
          <el-table-column prop="student" label="Ученик" />
          <el-table-column prop="item" label="Товар" />
          <el-table-column label="Статус">
            <el-tag type="success" effect="dark">Ждет ученика</el-tag>
          </el-table-column>
          <el-table-column label="Действие">
            <template #default="scope">
              <el-button type="primary" size="small" @click="completeOrder(scope.row)">
                Выдать товар
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

const activeTab = ref('new');

// Имитация базы заказов
const orders = ref([
  { id: 101, student: 'Иванов Иван', item: 'Ручка Boss', price: 100, status: 'waiting_approval' },
  { id: 102, student: 'Петрова Анна', item: 'Стикерпак', price: 50, status: 'waiting_approval' },
  { id: 103, student: 'Сидоров Макс', item: 'Билет в кино', price: 500, status: 'ready_for_pickup' },
]);

// Фильтры для вкладок
const newOrders = computed(() => orders.value.filter(o => o.status === 'waiting_approval'));
const readyOrders = computed(() => orders.value.filter(o => o.status === 'ready_for_pickup'));

// Логика Менеджера
const approveOrder = (order) => {
  order.status = 'ready_for_pickup';
  ElMessage.success(`Заказ #${order.id} подтвержден. Ждем ученика.`);
};

const completeOrder = (order) => {
  // Удаляем из списка (как будто выдали)
  orders.value = orders.value.filter(o => o.id !== order.id);
  ElMessage.success(`Заказ #${order.id} выдан!`);
};
</script>

<style scoped>
.manager-orders { padding: 20px; max-width: 800px; margin: 0 auto; }
</style>