<template>
  <div class="admin-users">
    <div class="page-header">
      <h2>👥 Пользователи системы</h2>
      <el-button type="primary" :icon="Plus" @click="dialogVisible = true">
        Добавить пользователя
      </el-button>
    </div>

    <el-card shadow="never">
      <el-table :data="users" style="width: 100%" stripe>
        
        <el-table-column prop="id" label="ID" width="60" />

        <el-table-column prop="fullname" label="ФИО Ученика / Учителя" min-width="180">
          <template #default="scope">
            <strong>{{ scope.row.fullname }}</strong>
            <div style="font-size: 12px; color: gray;">@{{ scope.row.username }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="role" label="Роль" width="120">
          <template #default="scope">
            <el-tag :type="getRoleColor(scope.row.role)" disable-transitions>
              {{ getRoleName(scope.row.role) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="balance" label="Баланс" width="120">
          <template #default="scope">
            <span v-if="scope.row.role === 'student'" style="color: green; font-weight: bold;">
              {{ scope.row.balance }} 🪙
            </span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <el-table-column label="Действия" width="150" align="right">
          <template #default="scope">
            <el-button size="small" :icon="Edit" circle />
            <el-button 
              size="small" 
              type="danger" 
              :icon="Delete" 
              circle 
              @click="handleDelete(scope.row)" 
            />
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="Новый пользователь" width="500px">
      <span>Здесь будет форма создания учителя или ученика.</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Отмена</el-button>
          <el-button type="primary" @click="dialogVisible = false">Создать</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const dialogVisible = ref(false);

// --- ФЕЙКОВЫЕ ДАННЫЕ (ЧТОБЫ БЫЛО КРАСИВО ПРЯМО СЕЙЧАС) ---
const users = ref([
  { id: 1, fullname: 'Директор Школы', username: 'admin', role: 'admin', balance: 0 },
  { id: 2, fullname: 'Mr. Smith', username: 'smith_eng', role: 'teacher', balance: 0 },
  { id: 3, fullname: 'Иванов Иван', username: 'ivan2009', role: 'student', balance: 150 },
  { id: 4, fullname: 'Петрова Анна', username: 'anna_p', role: 'student', balance: 320 },
  { id: 5, fullname: 'Сидоров Макс', username: 'max_power', role: 'student', balance: 10 },
]);

// Функция выбора цвета для роли
const getRoleColor = (role) => {
  if (role === 'admin') return 'danger';   // Красный
  if (role === 'teacher') return 'warning'; // Оранжевый
  return 'success';                         // Зеленый (Ученик)
};

// Функция перевода роли на русский
const getRoleName = (role) => {
  if (role === 'admin') return 'Админ';
  if (role === 'teacher') return 'Учитель';
  return 'Ученик';
};

// Удаление пользователя (Имитация)
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `Вы уверены, что хотите удалить пользователя "${row.fullname}"?`,
    'Внимание',
    { confirmButtonText: 'Удалить', cancelButtonText: 'Отмена', type: 'warning' }
  ).then(() => {
    // Удаляем из списка визуально
    users.value = users.value.filter(user => user.id !== row.id);
    ElMessage.success('Пользователь удален');
  });
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
h2 { margin: 0; color: #303133; }
</style>