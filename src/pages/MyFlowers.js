import { View } from "react-native";
import FlowersList from "../components/FlowersList/FlowersList";
import MenuNavigator from "../components/NavigationMenu/NavigationMenu";
import styles from "../styles";

const MyFlowersScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <FlowersList/>
        <MenuNavigator navigation={navigation} />
      </View>
    );
  };

export default MyFlowersScreen