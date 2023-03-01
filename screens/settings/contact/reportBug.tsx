import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "interfaces/RootStackParamList";
import Back from "components/Back";
import { ColumnCenterWrapper, ScreenContainer } from "styles/shared";
import i18n from "config/i18n";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "settingsContactReportBug"
>;

const { t } = i18n;

const ReportBug = ({ navigation }: Props): JSX.Element => {

    return (
        <ScreenContainer>
            <ColumnCenterWrapper>
                <Back navigation={navigation} />
            </ColumnCenterWrapper>
        </ScreenContainer>
    );
};

export default ReportBug;
