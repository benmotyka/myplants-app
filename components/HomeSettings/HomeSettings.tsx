import React from "react";
import { Entypo } from "@expo/vector-icons";
import { IconContainer, MenuContainer } from "./HomeSettings.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { HomeSettingsProps } from "./HomeSettings.interface";

const ICON_SIZE_PX = 24;
const ITEMS_MARGIN_PX = 60;
const ITEMS_OFFSET_PX = 20;

const settingsItems = [
  {
    name: "addPlant",
    icon: <Entypo name="plus" size={ICON_SIZE_PX} color={colors.lightBlack} />,
    href: 'addPlant'
  },
  {
    name: "appSettings",
    icon: <MaterialIcons name="settings" size={ICON_SIZE_PX} color={colors.lightBlack} />,
    href: 'settings'
  },
];


const HomeSettings = ({ navigation }: HomeSettingsProps): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      <IconContainer onPress={() => setShowMenu(!showMenu)}>
        <MaterialIcons
          style={{ transform: [{ rotate: showMenu ? "180deg" : "0deg" }] }}
          name="keyboard-arrow-up"
          size={ICON_SIZE_PX}
          color={colors.lightBlack}
        />
      </IconContainer>
      {/* TODO: transition */}
      {showMenu ? (
        <MenuContainer onPress={() => setShowMenu(false)}>
          {settingsItems.map((item, index) => (
            <IconContainer
              key={item.name}
              style={{ bottom: ITEMS_OFFSET_PX + (index + 1) * ITEMS_MARGIN_PX }}
              onPress={() => {
                navigation.navigate(item.href)
                setShowMenu(false)
              }}
            >
              {item.icon}
            </IconContainer>
          ))}
        </MenuContainer>
      ) : null}
    </>
  );
};

export default HomeSettings;
