<script setup lang="ts">
defineProps<{
  title: string
}>();
</script>

<template>
  <div class="card">
    <div v-if="title" class="title">
      <h4>{{ title }}</h4>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--base-white);
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-xs-gray);
  border-radius: 10px;
}

.card .body {
  padding: 20px;
}

.card .title {
  padding: 16px 20px;
  border-bottom: 1px solid var(--gray-100);
}

.card .title h4{
  margin: 0;
  font: var(--text-lg-medium);
}
</style>
