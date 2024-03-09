import { type GoogleSheetAppSetting } from "@prisma/client";
import { type IGoogleSheetAppSetting } from "~/types/commonType";
import { ref } from "vue";

export const useGoogleSheetAppSetting = () => {
  const data = ref<GoogleSheetAppSetting[]>([]);
  const hasError = ref(false);
  const errorMessage = ref();

  const create = async (googleSheetAppSetting: IGoogleSheetAppSetting) => {
    try {
      const newGoogleSheetApp = await prisma.googleSheetAppSetting.create({
        data: googleSheetAppSetting,
      });

      data.value?.push(newGoogleSheetApp);
    
    } catch (e) {
      hasError.value = true;
      errorMessage.value = e;
    }
  };

  const update = async (
    googleSheetAppSettingId: number,
    googleSheetAppSetting: GoogleSheetAppSetting
  ) => {
    try {
      const updatedGoogleSheetAppSetting =
        await prisma.googleSheetAppSetting.update({
          where: { id: googleSheetAppSettingId },
          data: googleSheetAppSetting,
        });

      const index = data.value?.findIndex(
        (item) => item.id === googleSheetAppSettingId
      );
      if (index !== -1) {
        data.value[index] = updatedGoogleSheetAppSetting;
      }
    } catch (e) {
      errorMessage.value = e;
      hasError.value = true;
    }
  };

  const destroy = async (googleSheetAppSettingId: number) => {
    try {
      const deletedGoogleSheetAppSetting =
        await prisma.googleSheetAppSetting.delete({
          where: { id: googleSheetAppSettingId },
        });

      const index = data.value?.findIndex(
        (item) => item.id === googleSheetAppSettingId
      );
      if (index !== -1) {
        data.value.splice(index, 1);
      }
    } catch (e) {
      errorMessage.value = e;
      hasError.value = true;
    }
  };

  const findById = async (googleSheetAppSettingId: number) => {
    try {
      const googleSheetAppSetting =
        await prisma.googleSheetAppSetting.findUnique({
          where: { id: googleSheetAppSettingId },
        });

      if (googleSheetAppSetting) {
        data.value?.push(googleSheetAppSetting);
      }
    } catch (e) {
      errorMessage.value = e;
      hasError.value = true;
    }
  };

  const findByStoreId = async (storeId: string) => {
    try {
      const googleSheetAppSetting =
        await prisma.googleSheetAppSetting.findUnique({
          where: { storeId: storeId },
        });

      if (googleSheetAppSetting) {
        data.value?.push(googleSheetAppSetting);
      }
    } catch (e) {
      errorMessage.value = e;
      hasError.value = true;
    }
  };

  const setAccessToken = async (
    storeId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const updatedGoogleSheetAppSetting =
        await prisma.googleSheetAppSetting.update({
          where: { storeId: storeId },
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        });

      data.value?.push(updatedGoogleSheetAppSetting);
    } catch (error) {
      errorMessage.value = error;
      hasError.value = true;
    }
  };

  return {
    data,
    hasError,
    create,
    update,
    findById,
    setAccessToken,
    destroy,
    errorMessage,
    findByStoreId
  };
};
