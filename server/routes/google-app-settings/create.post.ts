import { useGoogleSheetAppSetting } from "~/composables/useGoogleSheetAppSetting";
export default defineEventHandler(async (event) => {
  const { data, hasError, create,errorMessage } = useGoogleSheetAppSetting();

  const body = await readBody(event);

  if (!body.publicKey || !body.secretKey || !body.storeId) {
    throw new Error("an error occured");
  }

  await create({
    publicKey: body.publicKey,
    secretKey: body.secretKey,
    storeId: body.storeId,
  });

  if(hasError.value){
    setResponseStatus(event, 400);
  }
  
  return {
    data: data.value,
    hasError: hasError.value,
    errorMessage: errorMessage.value
  };
});
