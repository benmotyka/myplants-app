import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={homeStyles.container}>
      <Button
        style="auto"
        title="Go to My Account"
        color="#841584"
        onPress={() => navigation.navigate("MyAccount", { name: "Jane" })}
      />
      <MenuNavigator />
    </View>
  );
};

const MyAccountScreen = ({ navigation, route }) => {
  return (
    <View style={homeStyles.container}>
      <Text>This is {route.params.name}'s account</Text>
      <Button title="Go to home" onPress={() => navigation.navigate("Home")} />
      <MenuNavigator />
    </View>
  );
};

const MenuNavigator = () => {
  return <View style={styles.menuNavigatorContainer}/>;
};

export default function App() {
  const [text, onChangeText] = React.useState("tekst jakis");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Menu" }}
        />
        <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuNavigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#000",
  },
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    height: '100%',
    width: '100%',
  },
});
