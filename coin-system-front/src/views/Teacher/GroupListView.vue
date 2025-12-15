<template>
  <div class="teacher-dashboard">
    <h2>👨‍🏫 Мои группы</h2>

    <div v-if="!selectedGroup" class="groups-grid">
      <el-card 
        v-for="group in myGroups" 
        :key="group.id" 
        class="group-card" 
        shadow="hover"
        @click="openGroup(group)"
      >
        <template #header>
          <div class="card-header">
            <span>{{ group.name }}</span>
            <el-tag>{{ group.time }}</el-tag>
          </div>
        </template>
        <div class="group-stats">
          <p>Учеников: {{ group.student_count }}</p>
          <el-button type="primary" style="width: 100%; margin-top: 10px">
            Открыть журнал
          </el-button>
        </div>
      </el-card>
    </div>

    <div v-else>
      <el-button @click="selectedGroup = null" :icon="ArrowLeft" style="margin-bottom: 20px">
        Назад к группам
      </el-button>
      
      <h3>Ученики группы: {{ selectedGroup.name }}</h3>

      <el-table :data="studentsInGroup" border stripe style="width: 100%">
        <el-table-column prop="fullname" label="ФИО Ученика" />
        <el-table-column prop="balance" label="Текущий баланс" width="150">
          <template #default="scope">
            {{ scope.row.balance }} 🪙
          </template>
        </el-table-column>
        
        <el-table-column label="Действия" width="200">
          <template #default="scope">
            <el-button 
              type="success" 
              size="small" 
              @click="openAwardModal(scope.row)"
            >
              Начислить +
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" title="Начисление коинов" width="400px">
      <div v-if="selectedStudent">
        <p>Ученик: <strong>{{ selectedStudent.fullname }}</strong></p>
        
        <el-form label-position="top">
          <el-form-item label="Сколько начислить?">
            <el-input-number v-model="amount" :min="1" :max="10" />
            <div class="hint">Лимит: 10 коинов за раз</div>
          </el-form-item>
          
          <el-form-item label="Комментарий (за что?)">
            <el-input v-model="comment" placeholder="За активную работу..." />
          </el-form-item>
        </el-form>
      </div>
      
      <template #footer>
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="sendCoins">Отправить</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// --- Данные (Заглушки) ---
const myGroups = ref([
  { id: 101, name: 'English (Beginner)', time: 'ПН/СР 15:00', student_count: 12 },
  { id: 102, name: 'English (IELTS)', time: 'ВТ/ЧТ 18:00', student_count: 5 },
]);

// Когда открываем группу, тут будут ученики
const studentsInGroup = ref([]); 
const selectedGroup = ref(null);

// Для модалки
const dialogVisible = ref(false);
const selectedStudent = ref(null);
const amount = ref(5);
const comment = ref('');

// Логика
const openGroup = (group) => {
  selectedGroup.value = group;
  // Имитируем загрузку учеников этой группы
  studentsInGroup.value = [
    { id: 1, fullname: 'Иванов Иван', balance: 150 },
    { id: 2, fullname: 'Петрова Анна', balance: 320 },
    { id: 3, fullname: 'Сидоров Макс', balance: 10 },
  ];
};

const openAwardModal = (student) => {
  selectedStudent.value = student;
  amount.value = 5; // Сброс на дефолт
  comment.value = '';
  dialogVisible.value = true;
};

const sendCoins = () => {
  // Тут будет запрос к API: POST /transactions
  ElMessage.success(`Отправлено ${amount.value} коинов ученику ${selectedStudent.value.fullname}!`);
  
  // Визуально обновляем баланс (чтобы учитель видел результат сразу)
  selectedStudent.value.balance += amount.value;
  dialogVisible.value = false;
};
</script>

<style scoped>
.teacher-dashboard { padding: 20px; max-width: 800px; margin: 0 auto; }
.groups-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; font-weight: bold; }
.hint { font-size: 12px; color: gray; margin-top: 5px; }
.group-card { cursor: pointer; transition: transform 0.2s; }
.group-card:hover { transform: translateY(-5px); }
</style>