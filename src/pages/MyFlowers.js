import { View } from "react-native";
import MenuNavigator from "../components/NavigationMenu/NavigationMenu";
import styles from "../styles";

const MyFlowersScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <MenuNavigator navigation={navigation} />
      </View>
    );
  };

export default MyFlowersScreen