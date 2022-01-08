import { View } from "react-native";
import HomeList from "../components/HomeList/HomeList";
import MenuNavigator from "../components/NavigationMenu/NavigationMenu";
import styles from "../styles";

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <HomeList/>
        <MenuNavigator navigation={navigation} />
      </View>
    );
  };

export default HomeScreen