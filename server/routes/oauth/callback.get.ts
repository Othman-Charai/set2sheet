import { useGoogleConnector } from "~/composables/useGoogleConnector";
import { useGoogleSheetAppSetting } from "~/composables/useGoogleSheetAppSetting";

export default defineEventHandler(async (event) => {
  const { body } = await readBody(event);
  const parsedBody = JSON.parse(body);
  if (!parsedBody.code) {
    throw new Error("an error occured");
  }
});
