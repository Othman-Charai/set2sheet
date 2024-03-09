import type { IGoogleSheetAppSetting } from "~/types/commonType";
export const useGoogleConnector = () => {
  const { $google } = useNuxtApp();

  const createAuthUrl = (googleSheetAppSetting: IGoogleSheetAppSetting) => {
    const oauth2Client = new $google.auth.OAuth2(
      googleSheetAppSetting.publicKey,
      googleSheetAppSetting.secretKey,
      process.env.GOOGLE_OAUTH_URL
    );

    const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });

    return url;
  };

  const getAccessToken = async (code: string) => {
    const { tokens } = await $google.oauth2Client.getToken(code);
    $google.oauth2Client.setCredentials(tokens);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  };

  return {
    getAccessToken,
    createAuthUrl,
  };
};
