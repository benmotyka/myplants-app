import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, StatusBar as NativeStatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { AkayaKanadaka_400Regular } from "@expo-google-fonts/akaya-kanadaka";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Sentry from "sentry-expo";

import {
  sentryDsn
} from "config/environment";
import HomeScreen from "screens/home";
import AddPlantScreen from "screens/plants/add";
import EditPlantScreen from "screens/plants/edit";
import PlantHistoryScreen from "screens/plants/history";
import SettingsScreen from "screens/settings";
import ImportPlantScreen from "screens/plants/import";
import SettingsNotificationsScreen from "screens/settings/notifications";
import { store, persistor } from "store";
import "./i18n";

export type RootStackParamList = {
  home: undefined;
  addPlant: undefined;
  editPlant: { plantId: string };
  plantHistory: { plantId: string };
  importPlant: undefined;
  settings: undefined;
  settingsNotifications: undefined;
};

Sentry.init({
  dsn: sentryDsn,
  enableInExpoDevelopment: true,
  debug: true,
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    AkayaKanadaka_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaView>
            {/* Workaround for devices with native StatusBar */}
            <View style={{ paddingTop: NativeStatusBar.currentHeight }}>
              <StatusBar />
            </View>
          </SafeAreaView>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ gestureEnabled: false }}
              />

              <Stack.Screen name="addPlant" component={AddPlantScreen} />
              <Stack.Screen name="editPlant" component={EditPlantScreen} />
              <Stack.Screen name="plantHistory" component={PlantHistoryScreen} />
              <Stack.Screen name="importPlant" component={ImportPlantScreen} />

              <Stack.Screen name="settings" component={SettingsScreen} />
              <Stack.Screen
                name="settingsNotifications"
                component={SettingsNotificationsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
