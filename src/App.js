import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppLoading from "expo-app-loading";

import { useFonts, Inter_200ExtraLight } from "@expo-google-fonts/inter";

import { StatusBar } from "react-native";

import HomeScreen from "./pages/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  StatusBar.setBarStyle("dark-content", true);
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
