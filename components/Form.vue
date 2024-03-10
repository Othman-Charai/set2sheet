<script setup lang="ts">
import Card from './Card.vue';
</script>

<template>
  <div class="form">
    <Card>
      <div class="form-body">
        <slot />
      </div>
    </Card>
  </div>
</template>

<style scoped>
.form {
  width: 100%;
  max-width: 552px;
  margin: 0 auto;
}
.form .form-body{
 display: flex;
 flex-direction: column;
 row-gap: 20px;
}
</style>
