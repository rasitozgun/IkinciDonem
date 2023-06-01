import { View, Text } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import CustomerAppointment from "../screens/CustomerAppointment";
import CustomerScreen from "../screens/CustomerScreen";
import CustomerBarberList from "../screens/CustomerBarberList";
import CustomerBarberPage from "../screens/CustomerBarberPage";
import CustomerBarberDateTime from "../screens/CustomerBarberDateTime";
import CustomerEditProfile from "../screens/CustomerEditProfile";

const Tab = createBottomTabNavigator();
const CustomerStack = createStackNavigator();
const ShopStack = createStackNavigator();

const ProfileStack = () => {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="BarberList" component={CustomerBarberList} />
      <CustomerStack.Screen name="BarberPage" component={CustomerBarberPage} />
      <CustomerStack.Screen name="BarberDateTime" component={CustomerBarberDateTime} />
    </CustomerStack.Navigator>
  );
};

const CustomerProfileNavigator = () => {
  return (
    <ShopStack.Navigator initialRouteName="CustomerProfile" screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="CustomerProfile" component={CustomerScreen} />
      <ShopStack.Screen name="EditCustomerProfile" component={CustomerEditProfile} />
    </ShopStack.Navigator>
  );
};

export default function BarberNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={"BarberScreen"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === "CustomerBarberList") {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === "CustomerScreen") {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === "CustomerAppointmentScreen") {
              iconName = focused ? "calendar" : "calendar-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="CustomerBarberList" component={ProfileStack} />
        <Tab.Screen name="CustomerAppointmentScreen" component={CustomerAppointment} />
        <Tab.Screen name="CustomerScreen" component={CustomerProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
