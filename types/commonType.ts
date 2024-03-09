export interface IGoogleSheetAppSetting {
  id?: number;
  publicKey: string;
  secretKey: string;
  storeId: string;
  accessToken?: string;
  refreshToken?: string;
}
