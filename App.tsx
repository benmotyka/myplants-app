import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Inter_200ExtraLight } from "@expo-google-fonts/inter";

import HomeScreen from "./screens/Home";
import AddPlantScreen from "./screens/addPlant";
import EditPlant from "./screens/EditPlant";

type RootStackParamList = {
  Home: undefined;
  addPlant: { plantId: string };
  EditPlant: { plantId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="addPlant"
            component={AddPlantScreen}
            initialParams={{ plantId: "123" }}
          />
          <Stack.Screen
            name="EditPlant"
            component={EditPlant}
            initialParams={{ plantId: "123" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
