export interface UserKeys {
  clientId?: string
  secretKey?: string
}

export interface Sheet {
  id?: string
  name?: string
  status?: string
  keys?: string[]
}

export interface Session {
  id?: string[]
  accessToken?: string
  storeID?: string
}

export type DialogType = 'warning' | 'info' | 'danger' | 'success';
