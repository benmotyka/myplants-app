import AppLoading from "expo-app-loading";
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

import { sentryDsn } from "config/environment";
import StatusBar from "components/StatusBar";
import ErrorBoundary from "components/ErrorBoundary";
import { RootStackParamList } from "interfaces/RootStackParamList";
import HomeScreen from "screens/home";
import AddPlantScreen from "screens/plants/add";
import EditPlantScreen from "screens/plants/edit";
import PlantHistoryScreen from "screens/plants/history";
import SettingsScreen from "screens/settings";
import ImportPlantScreen from "screens/plants/import";
import SettingsNotificationsScreen from "screens/settings/notifications";
import SettingsAppScreen from "screens/settings/app";
import SettingsContactReportBug from "screens/settings/contact/reportBug";
import ToastProvider from "providers/ToastProvider";
import { darkTheme, lightTheme } from "styles/theme";
import { useAppConfigStore } from "store";
import "config/i18n";

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

    const appTheme = useAppConfigStore.persistent((state) => state.theme);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ThemeProvider theme={appTheme === "dark" ? darkTheme : lightTheme}>
            <RootSiblingParent>
                <StatusBar />
                <NavigationContainer>
                    <ToastProvider>
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

                                <Stack.Screen
                                    name="addPlant"
                                    component={AddPlantScreen}
                                />
                                <Stack.Screen
                                    name="editPlant"
                                    component={EditPlantScreen}
                                />
                                <Stack.Screen
                                    name="plantHistory"
                                    component={PlantHistoryScreen}
                                />
                                <Stack.Screen
                                    name="importPlant"
                                    component={ImportPlantScreen}
                                />

                                <Stack.Screen
                                    name="settings"
                                    component={SettingsScreen}
                                />
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
                    </ToastProvider>
                </NavigationContainer>
            </RootSiblingParent>
        </ThemeProvider>
    );
}
