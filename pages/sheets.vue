<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { Card, DialogBox, DraggableItem, List } from '~/components';
import type { Sheet } from '~/types';

const qantra = useQantra();

const showModal = ref(false);
const showDialog = ref(false);

const sheets = ref<Sheet[]>(
  [
    { id: 1, name: 'Sheet 1', status: true },
  ],
);

const sheetName = ref('');

const orderFields = ref([
  {
    name: 'John',
    id: 1,
  },
  {
    name: 'Joao',
    id: 2,
  },
  {
    name: 'Jean',
    id: 3,
  },
  {
    name: 'Gerard',
    id: 4,
  },
]);

const orderFields2 = ref([
  {
    name: 'mostafa',
    id: 1,
  },
  {
    name: 'arabi',
    id: 2,
  },
]);

const deleteSheet = () => {
  showDialog.value = true;
};

const onConfirm = () => {
  showModal.value = false;
  qantra.toast.show({
    title: 'This is a toast 🍞',
    description: 'Settings saved successfully',
    type: 'success',
  });
};
</script>

<template>
  <Card title="Sheets">
    <div class="container">
      <div class="action-bar">
        <PrimaryButton @click="showModal = true">
          <template #icon>
            <i class="i-youcan-plus" />
          </template>
          Add new sheet
        </PrimaryButton>
      </div>
      <List :sheets="sheets" />
    </div>
  </Card>
  <Modal v-model:visible="showModal" title="Add sheet" @on-confirm="onConfirm">
    <div class="modal-body">
      <InputGroup>
        <template #label>
          Sheet name
        </template>
        <template #input>
          <Input v-model="sheetName" type="text" placeholder="Sheet name" />
        </template>
      </InputGroup>
      <div class="grid-2">
        <draggable v-model="orderFields" item-key="id" group="name" class="drag-group">
          <template #item="{ element }">
            <DraggableItem>{{ element.name }}</DraggableItem>
          </template>
        </draggable>
        <draggable v-model="orderFields2" item-key="id" group="name" class="drag-group">
          <template #item="{ element }">
            <DraggableItem>{{ element.name }}</DraggableItem>
          </template>
        </draggable>
      </div>
    </div>
  </Modal>
  <DialogBox title="Are you sure you want to delete" dialog-type="warning" :show="showDialog" @on-backdrop-click="showDialog = false" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.action-bar {
  display: flex;
  flex-direction: row-reverse;
}

:deep(.table-container table tbody .table-row:last-child) {
  border-bottom: 0;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.drag-group {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  border: 1px solid var(--gray-100);
  border-radius: 10px;
}
</style>
