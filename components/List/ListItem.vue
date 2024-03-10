<script lang="ts" setup>
import type { Sheet } from '~/types';
defineProps<{ sheet?: Sheet }>();
</script>

<template>
  <div class="list-item">
    <a href="#">
      <img src="/sheets-icon.svg">
    </a>
    <div class="sheet-infos">
      <div class="name">
        {{ sheet.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-item{
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  transition: border 200ms linear;
}

.list-item a[href]{
 display: flex;
 align-items: center;
 justify-content: center;
 height: 130px;
 border-bottom: 1px solid var(--gray-200);
 transition: border-color 200ms linear;
}

.list-item a[href] img{
 height: 80%;
}
.list-item .sheet-infos .name{
 padding: 10px;
 box-sizing: border-box;
 width: 100%;
}

.list-item:hover,.list-item:hover a[href]{
  border-color: var(--gray-300);
}
</style>
