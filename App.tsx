import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
} from "@expo-google-fonts/inter";

import HomeScreen from "./screens/home";
import AddPlantScreen from "./screens/addPlant";
import EditPlant from "./screens/editPlant";
import SettingsScreen from "./screens/settings";
import LoginScreen from "./screens/login";
import { SafeAreaView } from "react-native";
import RegisterScreen from "./screens/register";

export type RootStackParamList = {
  login: undefined;
  register: undefined;
  home: undefined;
  addPlant: undefined;
  settings: undefined;
  editPlant: { plantId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="addPlant" component={AddPlantScreen} />

          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="editPlant" component={EditPlant} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
