import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { IconContainer, MenuContainer } from "./HomeSettings.styles";
import { colors } from "../../styles/colors";

const HomeSettings = (): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={{zIndex: 20}}>
        <IconContainer>
          <Ionicons name="settings-sharp" size={24} color={colors.lightBlack} />
        </IconContainer>
      </TouchableOpacity>
      {/* TODO: transition */}
      {showMenu ? <MenuContainer>heja</MenuContainer> : null}
    </>
  );
};

export default HomeSettings;
