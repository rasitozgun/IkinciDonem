import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BarberProfileScreen from "./BarberProfileScreen";
import AppointmentsScreen from "./AppointmentsScreen";
import ServicesScreen from "./ServicesScreen";

const Tab = createBottomTabNavigator();

const NavigationTabs = ({ route }) => {
  const { barberId } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Appointments") {
            iconName = "calendar";
          } else if (route.name === "Services") {
            iconName = "list";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Profile" component={BarberProfileScreen} initialParams={{ barberId }} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} initialParams={{ barberId }} />
      <Tab.Screen name="Services" component={ServicesScreen} initialParams={{ barberId }} />
    </Tab.Navigator>
  );
};

export default NavigationTabs;
