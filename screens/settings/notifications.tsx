import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "interfaces";
import Back from "components/Back";
import {
    ColumnCenterWrapper,
    ScreenContainer,
    Description,
} from "styles/shared";
import i18n from "config/i18n";
import BasicSwitch from "components/BasicSwitch";
import { useToastStore } from "store";
import { updateUserSettings } from "services/user";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "settingsNotifications"
>;

const { t } = i18n;

const SettingsNotifications = ({ navigation }: Props): JSX.Element => {
    const [isAllowNotificationsEnabled, setAllowNotificationsEnabled] =
        useState(false);
    const displayToast = useToastStore((state) => state.showToast);

    const handleSwitch = async (isEnabled: boolean) => {
        if (isEnabled === isAllowNotificationsEnabled) return;

        try {
            await updateUserSettings({
                pushNotificationsEnabled: isEnabled,
            });
        } catch (error) {
            return displayToast({ text: t("errors.general"), type: "error" });
        }
    };

    return (
        <ScreenContainer>
            <ColumnCenterWrapper>
                <Back navigation={navigation} />
                <BasicSwitch
                    label={t("pages.settings.notifications.manageHeader")}
                    leftItemLabel={t("common.disable")}
                    rightItemLabel={t("common.enable")}
                    onClickLeftItem={() => {
                        handleSwitch(false);
                        setAllowNotificationsEnabled(false);
                    }}
                    onClickRightItem={() => {
                        handleSwitch(true);
                        setAllowNotificationsEnabled(true);
                    }}
                    activeItem={isAllowNotificationsEnabled ? "right" : "left"}
                />
                <Description style={{ marginTop: 10 }}>
                    {t("pages.settings.notifications.manageDescription", {
                        state: isAllowNotificationsEnabled
                            ? t(
                                  "pages.settings.notifications.notificationsEnabled"
                              )
                            : t(
                                  "pages.settings.notifications.notificationsDisabled"
                              ),
                    })}
                </Description>
            </ColumnCenterWrapper>
        </ScreenContainer>
    );
};

export default SettingsNotifications;
