export const useOauth2Client = () => {
  const generateAuthUrl = (
    clientId: string,
    scopes: Array<string>,
  ) => {
    const params = {
      client_id: clientId,
      redirect_uri: "https://7ea9-197-146-246-6.ngrok-free.app/oauth/callback",
      response_type: "token",
      scope: scopes.join(' '),
    };
    const queryString = new URLSearchParams(params as  Record<string, string>).toString();

    return "https://accounts.google.com/o/oauth2/v2/auth"+"?"+queryString;
  };

  return {
    generateAuthUrl
  }
};
