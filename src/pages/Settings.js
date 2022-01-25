import styles from "../styles";
import MenuNavigator from "../components/NavigationMenu/NavigationMenu";
import { View } from "react-native";
import SettingsList from "../components/SettingsList/SettingsList";


const MyAccountScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
    <SettingsList/>
    <MenuNavigator navigation={navigation} />
  </View>
  )
}

export default MyAccountScreen