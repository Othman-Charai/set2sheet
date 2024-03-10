import { useOauth2Client } from "./useOauth2Client";

export const useGoogleConnector = () => {
  const createAuthUrl = (publicKey: string) => {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

    const url = useOauth2Client().generateAuthUrl(publicKey, scopes, "offline");

    return url.replace("watch?v=", "v/");
  };

  const getAccessToken = async (code: string) => {};

  return {
    getAccessToken,
    createAuthUrl,
  };
};
