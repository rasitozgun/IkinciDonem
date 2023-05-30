import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BarberNavigator from "./BarberNavigator";
import CustomerNavigator from "./CustomerNavigator";
import CustomerLoginScreen from "../screens/CustomerLoginScreen";
import BarberLoginScreen from "../screens/BarberLoginScreen";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import Register from "../screens/Register";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { userType, loading, session } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {userType && session ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userType === "barber" ? (
            <Stack.Screen name="Barber" component={BarberNavigator} options={{ title: false }} />
          ) : userType === "customer" ? (
            <Stack.Screen name="Customer" component={CustomerNavigator} />
          ) : null}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
          <Stack.Screen name="BarberLogin" component={BarberLoginScreen} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
