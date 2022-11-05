import React, { ReactElement, useState } from "react";
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import {
  IconWrapper,
  MenuContainer,
} from "components/HomeSettings/HomeSettings.styles";
import { HomeSettingsProps } from "components/HomeSettings/HomeSettings.interface";
import { AnimatePresence } from "moti";
import { ModalAnimationWrapper } from "styles/shared";
import { RootStackParamList } from "App";
import { ICON_SIZE_PX } from "config";

const ITEMS_MARGIN_PX = 60;
const ITEMS_OFFSET_PX = 20;

interface SettingsItem {
  name: string;
  icon: ReactElement;
  href: keyof RootStackParamList;
}

const HomeSettings = ({ navigation }: HomeSettingsProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();

  const settingsItems: SettingsItem[] = [
    {
      name: "addPlant",
      icon: <Entypo name="plus" size={ICON_SIZE_PX} color={theme.textLight} />,
      href: "addPlant",
    },

    {
      name: "importPlant",
      icon: (
        <Feather
          name="download-cloud"
          size={ICON_SIZE_PX}
          color={theme.textLight}
        />
      ),
      href: "importPlant",
    },
    {
      name: "appSettings",
      icon: (
        <MaterialIcons
          name="settings"
          size={ICON_SIZE_PX}
          color={theme.textLight}
        />
      ),
      href: "settings",
    },
  ];
  return (
    <>
      <IconWrapper onPress={() => setShowMenu(!showMenu)}>
        <MaterialIcons
          style={{ transform: [{ rotate: showMenu ? "180deg" : "0deg" }] }}
          name="keyboard-arrow-up"
          size={ICON_SIZE_PX}
          color={theme.textLight}
        />
      </IconWrapper>
      <AnimatePresence>
        {showMenu ? (
          <ModalAnimationWrapper
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <MenuContainer onPress={() => setShowMenu(false)} activeOpacity={1}>
              {settingsItems.map((item, index) => (
                <IconWrapper
                  key={item.name}
                  style={{
                    bottom: ITEMS_OFFSET_PX + (index + 1) * ITEMS_MARGIN_PX,
                  }}
                  onPress={() => {
                    // TODO: resolve typing error
                    // @ts-ignore
                    navigation.navigate(item.href);
                    setShowMenu(false);
                  }}
                >
                  {item.icon}
                </IconWrapper>
              ))}
            </MenuContainer>
          </ModalAnimationWrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default HomeSettings;
