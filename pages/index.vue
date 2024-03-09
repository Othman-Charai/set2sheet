<script setup lang="ts">
import type { IGoogleSheetAppSetting } from "~/types/commonType";

const publicKey = ref();
const secretKey = ref();
const googleSheetAppSetting = ref<IGoogleSheetAppSetting>();
const storeId = ref<string>();
const created = ref(true);
const googleAuthUrl = ref<string>();

//hooks
onMounted(async () => {
  const { data: session } = await useQantra().fetch("/auth/session");

  if (!session?.value?.storeId) {
    throw new Error("can't get store id");
  }
  storeId.value = session.value.storeId;

  const response = await $fetch(
    `google-app-settings/store/${session.value.storeId}`,
    {
      method: "GET",
    }
  );
  googleSheetAppSetting.value = response.data;
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

   googleAuthUrl.value= useGoogleConnector().createAuthUrl(
    googleSheetAppSetting.value
  );
};

const redirectToGoogleAuth=()=>{
  console.log(useGoogleConnector().createAuthUrl(
    googleSheetAppSetting.value as IGoogleSheetAppSetting
  ))
  window.location=useGoogleConnector().createAuthUrl(
    googleSheetAppSetting.value as IGoogleSheetAppSetting
  );
}

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
