import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AppLoading from 'expo-app-loading';

// import {
  // useFonts,
  // Nunito_400Regular,
  // Lato_400Regular,
  // Inter_900Black,
// } from '@expo-google-fonts/dev';

import {
  useFonts,
  Inter_900Black,
  Inter_200ExtraLight
} from '@expo-google-fonts/inter';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MenuNavigator navigation={navigation} />
    </View>
  );
};
<StatusBar />;

const MyFlowersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MenuNavigator navigation={navigation} />
    </View>
  );
};

const MyAccountScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>This is {route.params.name}'s account</Text>
      <MenuNavigator navigation={navigation} />
    </View>
  );
};

const MenuNavigator = (props) => {
  return (
    <View style={styles.menuNavigatorContainer}>
      <View style={styles.menuNavigatorItem}>
        <TouchableOpacity
          style={styles.menuNavigatorButton}
          onPress={() =>
            props.navigation.navigate("MyAccount", { name: "Jane" })
          }
        >
          <Feather name="user" size={20} color="grey" />
          <Text style={styles.menuNavigatorText}>My Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuNavigatorItem}>
        <TouchableOpacity
          style={styles.menuNavigatorButton}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Feather name="home" size={20} color="grey" />
          <Text style={styles.menuNavigatorText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuNavigatorItem}>
        <TouchableOpacity
          style={styles.menuNavigatorButton}
          onPress={() => props.navigation.navigate("MyFlowers")}
        >
          <Ionicons name="flower-outline" size={20} color="grey" />
          <Text style={styles.menuNavigatorText}>My Flowers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const [text, onChangeText] = React.useState("tekst jakis");
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_200ExtraLight
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccountScreen}
          options={{ title: "My account" }}
        />
        <Stack.Screen
          name="MyFlowers"
          component={MyFlowersScreen}
          options={{ title: "My flowers" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8F3",
    height: "100%",
    width: "100%",
    fontFamily: 'Inter_200ExtraLight'
  },
  menuNavigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "row",
  },
  menuNavigatorItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    height: "100%",
  },
  menuNavigatorButton: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  menuNavigatorText: {
    fontSize: 12,
    fontFamily: 'Inter_200ExtraLight'
  }
});
