import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
import AppLoading from "expo-app-loading";
import { useFonts, Inter_200ExtraLight } from "@expo-google-fonts/inter";
import Home from "./screens/Home";

export default function App() {
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
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
