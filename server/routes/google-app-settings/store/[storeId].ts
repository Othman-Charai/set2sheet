import { useGoogleSheetAppSetting } from "~/composables/useGoogleSheetAppSetting";

export default defineEventHandler(async (event) => {
  const storeId = event.context.params!.storeId;
  const { findByStoreId, data, hasError, errorMessage } =
    useGoogleSheetAppSetting();
  await findByStoreId(storeId);
  if(hasError.value){
    setResponseStatus(event, 400);
  }
  return {
    data: data.value,
    hasError: hasError,
    errorMessage: errorMessage,
  };
});
