<script setup lang="ts">
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

const currentSheet = ref<Sheet>();

const sheetName = ref('');

const FIELDS = [
  { name: 'Id', key: 'id', id: 1 },
  { name: 'Status', key: 'status', id: 2 },
  { name: 'Total', key: 'total', id: 3 },
  { name: 'Created at', key: 'created_at', id: 4 },
  { name: 'Payment status', key: 'status_text', id: 5 },
];

const orderFields = ref(FIELDS);

const orderSelectedFields = ref([]);

const deleteSheet = (sheet: Sheet) => {
  currentSheet.value = sheet;
  showDialog.value = true;
};

const onConfirm = () => {
  showModal.value = false;
  const newSheet: Sheet = { id: Math.floor(Math.random() * 2000000000), name: sheetName.value, status: true };
  sheets.value.push(newSheet);
  qantra.toast.show({
    title: 'Added successfully',
    description: 'Sheet was successfully Added',
    type: 'success',
  });
  orderSelectedFields.value = [];
  orderFields.value = FIELDS;
  sheetName.value = '';
};

const onConfirmDelete = () => {
  showDialog.value = false;
  if (currentSheet.value?.id) {
    const index = sheets.value.findIndex(el => el.id === currentSheet.value.id);
    if (index > -1) {
      sheets.value.splice(index, 1);
      qantra.toast.show({
        title: 'Successfully deleted',
        description: 'Sheet was successfully deleted',
        type: 'success',
      });
    }
  }
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
      <List v-if="sheets.length" :sheets="sheets" @delete="deleteSheet" />
      <div v-else class="no-data">
        You have no sheet yet,
        <button class="link-button" @click="showModal = true">
          add new one
        </button>
      </div>
    </div>
  </Card>
  <Modal v-model:visible="showModal" title="Add sheet" class="add-sheet-modal" @on-confirm="onConfirm">
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
        <div class="grid-col">
          <h4>Selected fields</h4>
          <draggable v-model="orderSelectedFields" item-key="id" group="name" class="drag-group">
            <template #item="{ element }">
              <DraggableItem>{{ element.name }}</DraggableItem>
            </template>
          </draggable>
        </div>
        <div class="grid-col">
          <h4>Order fields</h4>
          <draggable v-model="orderFields" item-key="id" group="name" class="drag-group">
            <template #item="{ element }">
              <DraggableItem>{{ element.name }}</DraggableItem>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </Modal>
  <DialogBox
    title="Are you sure you want to delete"
    dialog-type="warning"
    :show="showDialog"
    @on-confirm="onConfirmDelete"
    @on-cancel="() => showDialog = false"
    @on-backdrop-click="() => showDialog = false"
  />
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

.grid-2 .grid-col{
 display: flex;
 flex-direction: column;
 gap: 20px;
}

.grid-2 .grid-col h4{
  margin: 0;
  font: var(--text-sm-regular);
}

.grid-2 .drag-group {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  border: 1px solid var(--gray-100);
  border-radius: 10px;
  flex: 1;
}

.modal-body {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

.add-sheet-modal:deep(.body .modal){
  min-height: calc(100vh - 40px);
}
.no-data{
  align-items: center;
  padding: 20px;
  font: var(--text-md-regular);
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 4px;
}
.link-button{
  border: 0;
  background-color: transparent;
  padding: 0;
  outline: none;
  transition: all 150ms linear;
  color: var(--brand-500);
  display: flex;
  align-items: center;
  cursor: pointer;
  font: var(--text-md-regular);
}

.link-button:hover{
  color: var(--brand-600);
}
</style>
