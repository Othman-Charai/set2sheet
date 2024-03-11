<script lang="ts" setup>
import type { Sheet } from '~/types';
import { ListItem } from '~/components';

defineProps<{ sheets?: Sheet[] }>();

const emit = defineEmits(['delete']);
</script>

<template>
  <div class="list">
    <template v-for="sheet in sheets" :key="sheet.id">
      <div class="col">
        <ListItem :sheet="sheet" @delete="() => emit('delete', sheet)" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.list{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap: 20px;
}
.list .col{
  width: 100%;
  overflow: hidden;
}
</style>
