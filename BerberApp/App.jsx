import "react-native-url-polyfill/auto";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigator/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
