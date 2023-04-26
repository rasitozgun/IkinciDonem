import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Kayıt Ol" }}
        />
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{ title: "Hizmetler" }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: "Profil" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
