<script setup lang="ts">
import type { IGoogleSheetAppSetting } from "~/types/commonType";
const publicKey = ref();
const secretKey = ref();
const googleSheetAppSetting = ref();
const storeId = ref<string>();
const created = ref(true);
const googleAuthUrl = ref<string>();

//hooks
onBeforeMount(async () => {
  const { data: session } = await useQantra().fetch("/auth/session");

  storeId.value = session.value.storeId;

  const response = await $fetch(
    `google-app-settings/store/${session.value.storeId}`,
    {
      method: "GET",
    }
  );
  googleSheetAppSetting.value = response.data[0];

  console.log(googleSheetAppSetting.value);
});

// functions
const createGoogleSheetAppSetting = async () => {
  const data: IGoogleSheetAppSetting = await $fetch(
    "google-app-settings/create",
    {
      method: "POST",
      body: {
        publicKey: publicKey.value,
        secretKey: secretKey.value,
        storeId: storeId.value,
      },
    }
  );

  googleSheetAppSetting.value = data;
  created.value = true;

  googleAuthUrl.value = useGoogleConnector().createAuthUrl(
    googleSheetAppSetting.value
  );
};

const redirectToGoogleAuth = async () => {
  console.log(
    useGoogleConnector().createAuthUrl(
      googleSheetAppSetting.value.publicKey as string
    )
  );
  window.open(
    useGoogleConnector().createAuthUrl(
      googleSheetAppSetting.value.publicKey as string
    ),
    "_blank"
  );
  console.log('s')
};
</script>

<template>
  <div>
    <div v-if="googleSheetAppSetting">
      <p>{{ googleSheetAppSetting }}</p>
    </div>
    <form v-else @submit.prevent="createGoogleSheetAppSetting">
      <input type="text" v-model="publicKey" />
      <input type="text" v-model="secretKey" />
      <button>create</button>
    </form>

    <div v-if="created">
      <button @click="redirectToGoogleAuth">Continue</button>
    </div>
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>
