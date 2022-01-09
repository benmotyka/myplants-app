import { Text, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import styles from "../../styles";

const NavigationMenu = (props) => {
  const route = useRoute();
  return (
    <View style={styles.menuNavigatorContainer}>
      <View style={styles.menuNavigatorItem}>
        <TouchableOpacity
          style={
            route.name === "MyFlowers"
              ? styles.menuNavigatorButtonActive
              : styles.menuNavigatorButton
          }
          onPress={() => props.navigation.navigate("MyFlowers")}
        >
          <Ionicons name="flower-outline" size={20} color="grey" />
          <Text style={styles.menuNavigatorText}>My Flowers</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuNavigatorItem}>
        <TouchableOpacity
          style={
            route.name === "Home"
              ? styles.menuNavigatorButtonActive
              : styles.menuNavigatorButton
          }
          onPress={() => props.navigation.navigate("Home")}
        >
          <Feather name="home" size={20} color="grey" />
          <Text style={styles.menuNavigatorText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuNavigatorItem}>
        <TouchableOpacity
          style={
            route.name === "Settings"
              ? styles.menuNavigatorButtonActive
              : styles.menuNavigatorButton
          }
          onPress={() =>
            props.navigation.navigate("Settings", { name: "Jane" })
          }
        >
          <Feather name="tool" size={20} color="grey" />
          <Text style={styles.menuNavigatorText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationMenu;
