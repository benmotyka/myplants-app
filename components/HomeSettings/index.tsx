import React, { ReactElement, useState } from "react";
import { AnimatePresence, MotiView } from "moti";
import { MaterialIcons, Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { IconWrapper, MenuContainer } from "components/HomeSettings/styles";
import { Navigation } from "interfaces/Navigation";
import { ModalAnimationWrapper } from "styles/shared";
import { ICON_SIZE_PX } from "config";

const ITEMS_MARGIN_PX = 60;
const ITEMS_OFFSET_PX = 20;

interface Props extends Navigation {}

interface SettingsItem {
    name: string;
    icon: ReactElement;
    onClick: () => void;
}

const HomeSettings = ({ navigation }: Props): JSX.Element => {
    const [showMenu, setShowMenu] = useState(false);
    const theme = useTheme();

    const settingsItems: SettingsItem[] = [
        {
            name: "addPlant",
            icon: (
                <Entypo
                    name="plus"
                    size={ICON_SIZE_PX}
                    color={theme.textLight}
                />
            ),
            onClick: () => {
                navigation.navigate("addPlant");
            },
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
            onClick: () => {
                navigation.navigate("importPlant");
            },
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
            onClick: () => {
                navigation.navigate("settings");
            },
        },
        {
            name: "help",
            icon: (
                <AntDesign
                    name="question"
                    size={ICON_SIZE_PX}
                    color={theme.textLight}
                />
            ),
            onClick: () => {
                console.log("open help modal");
            },
        },
    ];
    return (
        <>
            <IconWrapper onPress={() => setShowMenu(!showMenu)}>
                <MotiView
                    from={{
                        rotate: "0deg",
                    }}
                    animate={{
                        rotate: showMenu ? "180deg" : "0deg",
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-up"
                        size={ICON_SIZE_PX}
                        color={theme.textLight}
                    />
                </MotiView>
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
                        <MenuContainer
                            onPress={() => setShowMenu(false)}
                            activeOpacity={1}
                        >
                            {settingsItems.map((item, index) => (
                                <IconWrapper
                                    key={item.name}
                                    style={{
                                        bottom:
                                            ITEMS_OFFSET_PX +
                                            (index + 1) * ITEMS_MARGIN_PX,
                                    }}
                                    onPress={() => {
                                        item.onClick();
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
