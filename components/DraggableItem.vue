<template>
  <div class="draggable-item">
    <slot />
  </div>
</template>

<style scoped>
.draggable-item{
  display: flex;
  gap: 12px;
  padding: 8px 14px;
  border-radius: 8px;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-xs-gray);
  cursor: grab;
}
</style>
