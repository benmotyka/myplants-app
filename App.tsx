import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Inter_200ExtraLight, Inter_300Light} from "@expo-google-fonts/inter";

import HomeScreen from "./screens/home";
import AddPlantScreen from "./screens/addPlant";
import EditPlant from "./screens/editPlant";
import SettingsScreen from "./screens/settings";
import LoginScreen from "./screens/login";

export type RootStackParamList = {
  login: undefined;
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
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="addPlant" component={AddPlantScreen} />
          <Stack.Screen name="login" component={LoginScreen} />

          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen
            name="editPlant"
            component={EditPlant}
            initialParams={{ plantId: "123" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
