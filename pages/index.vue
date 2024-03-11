<script setup lang="ts">
import { ref } from 'vue';
import { Form } from '~/components';
import type { UserKeys } from '~/types';

const userkeys = ref<UserKeys>({ clientId: '', secretKey: '' });
/*
const { data: session } = await useFetch('/session');
const submit = async () => {
  const res = await useFetch('https://859e-141-125-104-103.ngrok-free.app/api/google-account ', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {
      publicKey: 'body.publicKey',
      secretKey: 'body.secretKey',
      storeId: 'body.secretKey',
      accessToken: event.context.session.accessToken,
    },
  });
}; */
</script>

<template>
  <Form>
    <InputGroup>
      <template #label>
        App Client ID
      </template>
      <template #input>
        <Input v-model="userkeys.clientId" type="text" placeholder="Client ID" />
      </template>
    </InputGroup>

    <InputGroup>
      <template #label>
        App Secret key
      </template>
      <template #input>
        <Input v-model="userkeys.secretKey" type="text" placeholder="Secret key" />
      </template>
    </InputGroup>

    <div class="action-bar">
      <PrimaryButton @click="() => $router.push({ path: 'sheets' })">
        Connect account
      </PrimaryButton>
    </div>
  </Form>
</template>

<style scoped>
.action-bar{
  display: flex;
  flex-direction: row-reverse;
  margin-top: 30px;
}

html {
    background-color: white;
    font: var(--text-sm-regular);
}
</style>
