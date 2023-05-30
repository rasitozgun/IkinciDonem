import { View, Text } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import BarberScreen from "../screens/BarberScreen";
import BarberAddService from "../screens/BarberAddService";
import BarberServicesScreen from "../screens/BarberServicesScreen";
import BarberAppointmentScreen from "../screens/BarberAppointmentScreen";
import BarberEditProfile from "../screens/BarberEditProfile";
import BarberEditServices from "../screens/BarberEditServices";

const Tab = createBottomTabNavigator();
const CustomerStack = createStackNavigator();
const ShopStack = createStackNavigator();

const ServicesStack = () => {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="BarberServicesScreen" component={BarberServicesScreen} />
      <CustomerStack.Screen name="BarberAddService" component={BarberAddService} />
      <CustomerStack.Screen name="BarberEditService" component={BarberEditServices} />
    </CustomerStack.Navigator>
  );
};

const BarberProfileNavigator = () => {
  return (
    <ShopStack.Navigator initialRouteName="BarberProfile" screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="BarberProfile" component={BarberScreen} />
      <ShopStack.Screen name="BarberEditProfile" component={BarberEditProfile} />
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
            if (rn === "ServicesStack") {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === "BarberScreen") {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === "BarberAppointmentScreen") {
              iconName = focused ? "calendar" : "calendar-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="BarberAppointmentScreen" component={BarberAppointmentScreen} />
        <Tab.Screen name="ServicesStack" component={ServicesStack} />
        <Tab.Screen name="BarberScreen" component={BarberProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
