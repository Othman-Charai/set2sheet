import { useGoogleSheetAppSetting } from "~/composables/useGoogleSheetAppSetting";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const {setAccessToken}=useGoogleSheetAppSetting();
  if(!query.access_token){
    throw new Error("access token not found");
  }
  const token = query.access_token;
  setAccessToken(event.context.session.storeId,token as string,token as string);
  await sendRedirect(event, '/home.vue')
});
