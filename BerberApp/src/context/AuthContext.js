import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
export const AuthContext = createContext();
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  const getUserTypeFromPersistedStorage = async () => {
    try {
      const type = await SecureStore.getItemAsync("userType"); // Expo SecureStore ile userType'ı yerel depolamadan al
      setUserType(type);
      setLoading(false);
    } catch (error) {
      console.log("Error getting userType:", error);
    }
  };

  const deleteUserTypeFromPersistedStorage = async () => {
    try {
      await SecureStore.deleteItemAsync("userType"); // Expo SecureStore ile userType'ı yerel depolamadan sil
      const { error } = await supabase.auth.signOut();
      if (error) console.log(error.message);
      setUserType(null);
    } catch (error) {
      console.log("Error deleting userType:", error);
    }
  };

  useEffect(() => {
    getUserTypeFromPersistedStorage();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = async () => {
    setLoading(true);
    deleteUserTypeFromPersistedStorage();
    setLoading(false);
  };

  const setUserTypeAndPersist = async (type) => {
    try {
      await SecureStore.setItemAsync("userType", type); // Expo SecureStore ile userType'ı yerel depolamada sakla
      setUserType(type);
    } catch (error) {
      console.log("Error storing userType:", error);
    }
  };

  async function signUpWithEmail(email, password) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) console.log(error.message);
    setLoading(false);
  }

  async function signInCustomer(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Error signing in:", error.message, error.code);
    } else {
      setUserType("customer");
      setUserTypeAndPersist("customer");
    }
  }

  async function signInBarber(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log("Error signing in:", error.message);
    } else {
      setUserType("barber");
      setUserTypeAndPersist("barber");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userType,
        loading,
        getUserTypeFromPersistedStorage,
        setUserTypeAndPersist,
        signOut,
        signInCustomer,
        signInBarber,
        signUpWithEmail,
        session,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
