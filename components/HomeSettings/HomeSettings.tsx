import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { IconContainer, MenuContainer } from "./HomeSettings.styles";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from "../../styles/colors";

const settingsItems = [
  {
    name: "addPlant",
    icon: <Entypo name="plus" size={24} color={colors.lightBlack} />,
  },
  {
    name: "appSettings",
    icon: <MaterialIcons name="app-settings-alt" size={24} color="black" />
  },
  {
    name: "account",
    icon: <MaterialCommunityIcons name="account" size={24} color="black" />
  }
];

const ITEMS_MARGIN_PX = 60
 
const HomeSettings = (): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowMenu(!showMenu)}
        style={{ zIndex: 20 }}
      >
        <IconContainer>
          <Ionicons name="settings-sharp" size={24} color={colors.lightBlack} />
        </IconContainer>
      </TouchableOpacity>
      {/* TODO: transition */}
      {showMenu ? (
        <MenuContainer>
          {settingsItems.map((item, index) => (
            <IconContainer style={{ bottom: 20 + ((index + 1) * ITEMS_MARGIN_PX) }}>
              {item.icon}
            </IconContainer>
          ))}
        </MenuContainer>
      ) : null}
    </>
  );
};

export default HomeSettings;
