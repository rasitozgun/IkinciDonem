import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key);
  },
};

const SUPABASE_URL = "https://vvifnwsdyzhflafsccpd.supabase.co";
const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2aWZud3NkeXpoZmxhZnNjY3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MzE3NTcsImV4cCI6MTk5ODIwNzc1N30.KdOsRnIhWttrxWO9nrIkR_CzZQoKaNzrFxROaaRoINA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
