<script lang="ts" setup>
import type { Sheet } from '~/types';
defineProps<{ sheet?: Sheet }>();

const emit = defineEmits(['delete']);
</script>

<template>
  <div class="list-item">
    <a href="#" target="_blank">
      <img src="/sheets-icon.svg">
    </a>
    <div class="sheet-infos">
      <div class="name">
        {{ sheet.name }}
      </div>

      <button class="action-button" @click="() => emit('delete')">
        <i class="i-youcan-trash" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  transition: border 150ms linear;
}

.list-item a[href] {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  border-bottom: 1px solid var(--gray-200);
  transition: border-color 150ms linear;
}

.list-item a[href] img {
  height: 80%;
}

.list-item .sheet-infos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}

.list-item .sheet-infos .name {
  font: var(--text-sm-medium);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
}

.list-item .sheet-infos .action-button {
  width: 30px;
  height: 30px;
  border: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  background-color: var(--base-white);
  transition: all 150ms linear;
  cursor: pointer;
}

.list-item .sheet-infos .action-button i{
  width: 60%;
  height: 60%;
  color: var(--gray-500);
  transition: color 150ms linear;
}

.list-item .sheet-infos .action-button:hover {
  background-color: var(--gray-100);
}

.list-item .sheet-infos .action-button:hover i{
  color: var(--brand-500);
}

.list-item:hover,
.list-item:hover a[href] {
  border-color: var(--gray-300);
}
</style>
