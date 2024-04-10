import * as SecureStore from "expo-secure-store";

export const saveDataToStorage = async (key: string, value: any) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getDataFromStorage = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
};
