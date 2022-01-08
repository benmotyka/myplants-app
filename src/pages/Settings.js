
  
import { View, Text } from "react-native";
import MenuNavigator from "../components/NavigationMenu/NavigationMenu";
import styles from "../styles";

const MyAccountScreen = ({ navigation, route }) => {
    return (
      <View style={styles.container}>
        <Text>This is {route.params.name}'s settings</Text>
        <MenuNavigator navigation={navigation} />
      </View>
    );
  };
export default MyAccountScreen