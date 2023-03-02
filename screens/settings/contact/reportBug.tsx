import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "interfaces/RootStackParamList";
import Back from "components/Back";
import {
    ColumnCenterWrapper,
    ScreenContainer,
    InputsWrapper,
    LoaderWrapper,
} from "styles/shared";
import i18n from "config/i18n";
import BasicTextInput from "components/BasicTextInput";
import { Formik, FormikHelpers } from "formik";
import { ReportBugSchema } from "schemas/ReportBug.schema";
import { View } from "react-native";
import BasicButton from "components/BasicButton";
import { useToastStore } from "store/index";
import Loader from "components/Loader";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "settingsContactReportBug"
>;

const { t } = i18n;

const MIN_DESCRIPTION_LENGTH = 5;

interface ReportBugForm {
    email: string;
    description: string;
}

const ReportBug = ({ navigation }: Props): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const displayToast = useToastStore((state) => state.showToast);

    const handleSubmit = async (
        values: ReportBugForm,
        {
            resetForm,
        }: {
            resetForm: FormikHelpers<ReportBugForm>["resetForm"];
        }
    ) => {
        try {
            setLoading(true);
            // Fake timeout
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // TODO: Send email
            resetForm();
            navigation.navigate("home");
            displayToast({
                text: t("pages.settings.reportBug.success"),
                type: "success",
            });
        } catch (error) {
            return displayToast({
                text: t("errors.general"),
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <ScreenContainer>
            <ColumnCenterWrapper>
                <Back navigation={navigation} />
                {loading ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>
                ) : (
                    <Formik
                        initialValues={{ email: "", description: "" }}
                        validationSchema={ReportBugSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                        }) => (
                            <InputsWrapper>
                                <BasicTextInput
                                    value={values.email}
                                    label={t(
                                        "pages.settings.reportBug.emailLabel"
                                    )}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    error={errors.email}
                                />
                                <BasicTextInput
                                    value={values.description}
                                    label={t(
                                        "pages.settings.reportBug.descriptionLabel"
                                    )}
                                    placeholder={t(
                                        "pages.settings.reportBug.descriptionPlaceholder"
                                    )}
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                    error={errors.description}
                                    textarea
                                />
                                <View style={{ marginVertical: 30 }}>
                                    <BasicButton
                                        onPress={
                                            handleSubmit as (
                                                values: unknown
                                            ) => void
                                        }
                                        text={t("common.submit")}
                                        disabled={
                                            values.description.length <
                                            MIN_DESCRIPTION_LENGTH
                                        }
                                    />
                                </View>
                            </InputsWrapper>
                        )}
                    </Formik>
                )}
            </ColumnCenterWrapper>
        </ScreenContainer>
    );
};

export default ReportBug;
