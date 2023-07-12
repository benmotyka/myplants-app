import AppLoading from "expo-app-loading";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from "react-native-toast-message";
import { RootSiblingParent } from "react-native-root-siblings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { AkayaKanadaka_400Regular } from "@expo-google-fonts/akaya-kanadaka";
import * as Sentry from "sentry-expo";
import { ThemeProvider } from "styled-components/native";
import * as Notifications from "expo-notifications";
import { sentryDsn } from "config/environment";
import StatusBar from "components/StatusBar";
import ErrorBoundary from "components/ErrorBoundary";
import { RootStackParamList } from "interfaces";
import HomeScreen from "screens/home";
import AddPlantScreen from "screens/plants/add";
import EditPlantScreen from "screens/plants/edit";
import PlantHistoryScreen from "screens/plants/history";
import SettingsScreen from "screens/settings";
import ImportPlantScreen from "screens/plants/import";
import SettingsNotificationsScreen from "screens/settings/notifications";
import SettingsAppScreen from "screens/settings/app";
import SettingsContactReportBug from "screens/settings/contact/reportBug";
import { darkTheme, lightTheme } from "styles/theme";
import { useAppConfigStore } from "store";
import "config/i18n";

Sentry.init({
  dsn: sentryDsn,
  enableInExpoDevelopment: true,
  debug: true,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Workaround for errors in SDK 48
if (typeof window !== "undefined") {
  // @ts-ignore
  window._frameTimestamp = null;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    AkayaKanadaka_400Regular,
  });

  const appTheme = useAppConfigStore.persistent((state) => state.theme);
  const currentTheme = appTheme === "dark" ? darkTheme : lightTheme;

  const toastConfig = {
    success: (props: ToastProps) => (
      <BaseToast
        {...props}
        
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{ backgroundColor: currentTheme.success }}
        text1Style={{
          fontSize: 20,
          fontWeight: "400",
          color: currentTheme.white,
        }}
      />
    ),
    error: (props: ToastProps) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: currentTheme.warning }}
        contentContainerStyle={{ paddingHorizontal: 10, backgroundColor: currentTheme.warning, opacity: 0.8 }}
        text1Style={{
          fontSize: 18,
          color: currentTheme.white,
        }}
        text2Style={{
            fontSize: 16,
            color: currentTheme.white,
            marginTop: 5,
        }}
        
      />
    ),
  };

  return fontsLoaded ? (
    <ThemeProvider theme={currentTheme}>
      <RootSiblingParent>
        <StatusBar />
        <NavigationContainer>
            <ErrorBoundary>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: "fade_from_bottom",
                }}
              >
                <Stack.Screen
                  name="home"
                  component={HomeScreen}
                  options={{ gestureEnabled: false }}
                />

                <Stack.Screen name="addPlant" component={AddPlantScreen} />
                <Stack.Screen name="editPlant" component={EditPlantScreen} />
                <Stack.Screen
                  name="plantHistory"
                  component={PlantHistoryScreen}
                />
                <Stack.Screen
                  name="importPlant"
                  component={ImportPlantScreen}
                />

                <Stack.Screen name="settings" component={SettingsScreen} />
                <Stack.Screen
                  name="settingsNotifications"
                  component={SettingsNotificationsScreen}
                />
                <Stack.Screen
                  name="settingsApp"
                  component={SettingsAppScreen}
                />
                <Stack.Screen
                  name="settingsContactReportBug"
                  component={SettingsContactReportBug}
                />
              </Stack.Navigator>
            </ErrorBoundary>
        </NavigationContainer>
      </RootSiblingParent>
      <Toast config={toastConfig} />
    </ThemeProvider>
  ) : (
    <AppLoading />
  );
}
