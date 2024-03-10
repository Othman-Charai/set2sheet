<script setup lang="ts">
const publicKey = ref();
const secretKey = ref();
const googleSheetAppSetting = ref();
const storeId = ref<string>();
const created = ref(true);
const googleAuthUrl = ref<string>();
const youcanShopAccessToken=ref<string>();

//hooks
onBeforeMount(async () => {
  const { data: session } = await useQantra().fetch("/auth/session");

  storeId.value = session.value.storeId;
  youcanShopAccessToken.value=session.value.accessToken

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
  const data = await $fetch(
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

const redirectToGoogleAuth =() => {
  window.open(
    useGoogleConnector().createAuthUrl(
      googleSheetAppSetting.value.publicKey as string
    ),
    "_blank"
  );
};

const connectToShop=async()=>{
  console.log(youcanShopAccessToken.value)
  useYoucanShop().subsribeToOrderCreated(youcanShopAccessToken.value as string)
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
    <button @click="connectToShop">Connect to shop</button>
  </div>
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}
</style>
