<script lang="ts" setup>
import type { Sheet } from '~/types';
import { ListItem } from '~/components';

defineProps<{ sheets?: Sheet[] }>();
</script>

<template>
  <div class="list">
    <template v-for="sheet in sheets" :key="sheet.id">
      <div>
        <ListItem :sheet="sheet" />
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
</style>
