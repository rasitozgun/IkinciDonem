import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/pages/Register";
import ProductPage from "./src/pages/ProductPage";
import ProfilePage from "./src/pages/CustomerProfilePage";
import supabase from "./lib/supabase";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} options={{ title: "Kayıt Ol" }} />
        <Stack.Screen name="ProductPage" component={ProductPage} options={{ title: "Hizmetler" }} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ title: "Profil" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
