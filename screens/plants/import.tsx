import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { RootStackParamList } from "interfaces";
import Back from "components/Back";
import BasicTextInput from "components/BasicTextInput";
import BasicButton from "components/BasicButton";
import Loader from "components/Loader";
import {
    ColumnCenterWrapper,
    HelperButton,
    InputsWrapper,
    KeyboardScreen,
} from "styles/shared";
import { ApiErrors } from "enums/api-errors";
import { ImportPlantSchema } from "schemas/ImportPlant.schema";
import { ICON_SIZE_PX } from "config";
import { importPlant } from "services/plant";
import ImportPlantHelpModal from "modals/ImportPlantHelp";
import { showToast } from "utils/toast";
import i18n from "config/i18n";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "importPlant"
>;

interface ImportPlantForm {
    plantShareId: string;
}

const { t } = i18n;

const ImportPlant = ({ navigation }: Props): JSX.Element => {
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const onSubmit = async (
        values: ImportPlantForm,
        formikHelpers: FormikHelpers<ImportPlantForm>
    ) => {
        try {
            setLoading(true);

            await importPlant(values.plantShareId);
            formikHelpers.resetForm();
            navigation.navigate("home");
            showToast({
                text1: t("pages.plants.import.success"),
                type: "success",
            });
        } catch (error) {
            switch (error) {
                case ApiErrors.PLANT_ALREADY_ADDED:
                    return showToast({
                        text1: t("errors.plantAlreadyAdded"),
                        type: "info",
                    });
                case ApiErrors.INVALID_PLANT:
                    return showToast({
                        text1: t("errors.plantNotExists"),
                        type: "error",
                    });
                default:
                    return showToast({
                        text1: t("errors.general"),
                        text2: t("errors.generalDescription"),
                        type: "error",
                    });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <KeyboardScreen
                contentContainerStyle={{ paddingBottom: 50 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                bounces={false}
                style={{
                    backgroundColor: theme.background,
                }}
            >
                <ColumnCenterWrapper>
                    <Back navigation={navigation} />
                    <HelperButton
                        onPress={() => {
                            setShowHelpModal(true);
                        }}
                    >
                        <AntDesign
                            name="question"
                            size={ICON_SIZE_PX}
                            color={theme.textLight}
                        />
                    </HelperButton>
                    {!loading ? (
                        <Formik
                            initialValues={{
                                plantShareId: "",
                            }}
                            onSubmit={onSubmit}
                            validationSchema={ImportPlantSchema}
                            validateOnChange={false}
                            validateOnBlur={false}
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
                                        value={values.plantShareId}
                                        label={t(
                                            "pages.plants.import.inputLabel"
                                        )}
                                        placeholder={t(
                                            "pages.plants.import.inputPlaceholder"
                                        )}
                                        onChangeText={handleChange(
                                            "plantShareId"
                                        )}
                                        onBlur={handleBlur("plantShareId")}
                                        error={errors.plantShareId}
                                    />
                                    <View style={{ marginVertical: 30 }}>
                                        <BasicButton
                                            onPress={handleSubmit}
                                            text={t("common.confirm")}
                                        />
                                    </View>
                                </InputsWrapper>
                            )}
                        </Formik>
                    ) : (
                        <Loader topMargin />
                    )}
                </ColumnCenterWrapper>
            </KeyboardScreen>
            <ImportPlantHelpModal
                showModal={showHelpModal}
                toggleModal={setShowHelpModal}
            />
        </>
    );
};

export default ImportPlant;
