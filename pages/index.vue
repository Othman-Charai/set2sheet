<script setup lang="ts">
import { Form } from '~/components';

const publicKey = ref();
const secretKey = ref();
const googleSheetAppSetting = ref();
const storeId = ref<string>();
const created = ref(true);
const googleAuthUrl = ref<string>();
const youcanShopAccessToken = ref<string>();

// hooks
onMounted(async () => {
  setTimeout(async () => {
    const { data: session } = await useQantra().fetch('/auth/session');

    storeId.value = session.value.storeId;
    youcanShopAccessToken.value = session.value.accessToken;

    const response = await $fetch(
            `google-app-settings/store/${session.value.storeId}`,
            {
              method: 'GET',
            },
    );
    googleSheetAppSetting.value = response.data[0];

    console.log(googleSheetAppSetting.value);
  }, 1);
});

// functions
const createGoogleSheetAppSetting = async () => {
  const data = await $fetch(
    'google-app-settings/create',

    {
      method: 'POST',
      body: {
        publicKey: publicKey.value,
        secretKey: secretKey.value,
        storeId: storeId.value,
      },
    },
  );

  googleSheetAppSetting.value = data;
  created.value = true;

  googleAuthUrl.value = useGoogleConnector().createAuthUrl(
    googleSheetAppSetting.value,
  );
};

const redirectToGoogleAuth = () => {
  window.open(
    useGoogleConnector().createAuthUrl(
      googleSheetAppSetting.value.publicKey as string,
    ),
    '_blank',
  );
};

const connectToShop = async () => {
  console.log(youcanShopAccessToken.value);
  useYoucanShop().subsribeToOrderCreated(
    youcanShopAccessToken.value as string,
  );
};
</script>

<template>
  <Form>
    <InputGroup>
      <template #label>
        App Client ID
      </template>
      <template #input>
        <Input v-model="publicKey" type="text" placeholder="Client ID" />
      </template>
    </InputGroup>

    <InputGroup>
      <template #label>
        App Secret key
      </template>
      <template #input>
        <Input v-model="secretKey" type="text" placeholder="Secret key" />
      </template>
    </InputGroup>

    <div class="action-bar">
      <PrimaryButton @click="createGoogleSheetAppSetting()">
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
