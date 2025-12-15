<template>
  <div class="admin-groups">
    <div class="page-header">
      <h2>📅 Учебные Группы</h2>
      <el-button type="primary" :icon="Plus" @click="dialogVisible = true">Создать группу</el-button>
    </div>

    <el-table :data="groups" border stripe>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="Название группы" />
      <el-table-column prop="teacher" label="Учитель" />
      <el-table-column prop="schedule" label="Расписание" />
      <el-table-column label="Действия" width="120">
        <template #default>
          <el-button type="danger" size="small" :icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="Новая группа" width="400px">
      <el-form label-position="top">
        <el-form-item label="Название (например: English A1)">
          <el-input v-model="newGroup.name" />
        </el-form-item>
        
        <el-form-item label="Выберите учителя">
          <el-select v-model="newGroup.teacher" placeholder="Учитель" style="width: 100%">
            <el-option label="Mr. Smith" value="Mr. Smith" />
            <el-option label="Айгуль Сериковна" value="Айгуль Сериковна" />
          </el-select>
        </el-form-item>

        <el-form-item label="Расписание (текст)">
          <el-input v-model="newGroup.schedule" placeholder="ПН/СР 15:00" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="createGroup">Сохранить</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Plus, Delete } from '@element-plus/icons-vue';

const dialogVisible = ref(false);

const groups = ref([
  { id: 1, name: 'English Beginners', teacher: 'Mr. Smith', schedule: 'ПН/СР 15:00' },
  { id: 2, name: 'Math Grade 9', teacher: 'Айгуль Сериковна', schedule: 'ВТ/ЧТ 10:00' },
]);

const newGroup = reactive({ name: '', teacher: '', schedule: '' });

const createGroup = () => {
  groups.value.push({
    id: Date.now(),
    name: newGroup.name,
    teacher: newGroup.teacher,
    schedule: newGroup.schedule
  });
  dialogVisible.value = false;
};
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
</style>