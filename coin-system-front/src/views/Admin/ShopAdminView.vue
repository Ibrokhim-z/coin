<template>
  <div class="admin-shop">
    <div class="page-header">
      <h2>🛍️ Управление Магазином</h2>
      <el-button type="primary" :icon="Plus" @click="openCreateModal">Добавить товар</el-button>
    </div>

    <el-table :data="products" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      
      <el-table-column label="Иконка" width="80" align="center">
        <template #default="scope">
          <div class="product-icon" :style="{ background: scope.row.color }">
            {{ scope.row.icon }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="Название" />
      <el-table-column prop="price" label="Цена (коинов)" width="150" sortable />
      
      <el-table-column label="Действия" width="150" align="right">
        <template #default="scope">
          <el-button size="small" :icon="Edit" circle @click="handleEdit(scope.row)" />
          <el-button size="small" type="danger" :icon="Delete" circle @click="handleDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? 'Редактировать товар' : 'Новый товар'" width="400px">
      <el-form label-position="top">
        <el-form-item label="Название">
          <el-input v-model="form.name" placeholder="Напр: Стикерпак" />
        </el-form-item>
        
        <el-form-item label="Цена">
          <el-input-number v-model="form.price" :min="1" />
        </el-form-item>

        <el-form-item label="Иконка (Эмодзи)">
          <el-input v-model="form.icon" placeholder="😎" />
        </el-form-item>
        
        <el-form-item label="Цвет фона">
          <el-color-picker v-model="form.color" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="saveProduct">Сохранить</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const products = ref([
  { id: 1, name: 'Стикерпак', price: 50, icon: '😎', color: '#ff9a9e' },
  { id: 2, name: 'Ручка "Boss"', price: 100, icon: '🖊️', color: '#a18cd1' },
]);

const dialogVisible = ref(false);
const isEdit = ref(false);
const form = reactive({ id: null, name: '', price: 50, icon: '🎁', color: '#409EFF' });

const openCreateModal = () => {
  isEdit.value = false;
  form.id = null;
  form.name = '';
  form.price = 50;
  form.icon = '🎁';
  dialogVisible.value = true;
};

const handleEdit = (row) => {
  isEdit.value = true;
  Object.assign(form, row); // Копируем данные в форму
  dialogVisible.value = true;
};

const saveProduct = () => {
  if (isEdit.value) {
    // Обновляем существующий (в массиве)
    const index = products.value.findIndex(p => p.id === form.id);
    products.value[index] = { ...form };
  } else {
    // Создаем новый
    products.value.push({ ...form, id: Date.now() });
  }
  dialogVisible.value = false;
  ElMessage.success('Сохранено!');
};

const handleDelete = (row) => {
  ElMessageBox.confirm('Удалить этот товар?', 'Warning', { type: 'warning' })
    .then(() => {
      products.value = products.value.filter(p => p.id !== row.id);
      ElMessage.success('Удалено');
    });
};
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.product-icon { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto; }
</style>