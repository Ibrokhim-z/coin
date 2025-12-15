<template>
  <div>
    <div class="page-header">
      <h2>Все пользователи</h2>
      <el-button type="primary" :icon="Plus">Добавить</el-button>
    </div>

    <el-table :data="users" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="fullname" label="ФИО" />
      <el-table-column prop="role" label="Роль">
        <template #default="scope">
          <el-tag :type="getRoleColor(scope.row.role)">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="Баланс 🪙" width="120" />
      
      <el-table-column label="Действия" width="180">
        <template #default>
          <el-button size="small" type="primary" :icon="Edit" circle />
          <el-button size="small" type="danger" :icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';

// Фейковые данные для теста верстки (потом заменим на запрос к API)
const users = ref([
  { id: 1, fullname: 'Админ Главный', role: 'admin', balance: 0 },
  { id: 2, fullname: 'Иванов Иван (Учитель)', role: 'teacher', balance: 0 },
  { id: 3, fullname: 'Петров Петя (Ученик)', role: 'student', balance: 150 },
  { id: 4, fullname: 'Сидорова Анна (Ученик)', role: 'student', balance: 320 },
]);

// Цвет тега в зависимости от роли
const getRoleColor = (role) => {
  if (role === 'admin') return 'danger';
  if (role === 'teacher') return 'warning';
  return 'success';
};
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
</style>