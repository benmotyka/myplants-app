import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { RootStackParamList } from "interfaces/RootStackParamList";
import Back from "components/Back";
import BasicTextInput from "components/BasicTextInput";
import BasicButton from "components/BasicButton";
import Loader from "components/Loader";
import {
    ColumnCenterWrapper,
    Description,
    IconContainer,
    InputsWrapper,
    KeyboardScreen,
} from "styles/shared";
import { ApiErrors } from "enums/api-errors";
import { ImportPlantSchema } from "schemas/ImportPlant.schema";
import { useToastStore } from "store";
import i18n from "config/i18n";
import { ICON_SIZE_PX } from "config";
import BasicModal from "components/BasicModal";
import { ModalItem } from "components/BasicModal/styles";
import { importPlant } from "services/plant";

type ImportPlantProps = NativeStackScreenProps<
    RootStackParamList,
    "importPlant"
>;

interface ImportPlantForm {
    plantShareId: string;
}

const { t } = i18n;

const ImportPlant = ({ navigation }: ImportPlantProps): JSX.Element => {
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const displayToast = useToastStore((state) => state.showToast);
    const theme = useTheme();

    const onSubmit = async (
        values: ImportPlantForm,
        {
            resetForm,
        }: {
            resetForm: FormikHelpers<ImportPlantForm>["resetForm"];
        }
    ) => {
        try {
            setLoading(true);

            await importPlant(values.plantShareId);
            resetForm();
            navigation.navigate("home");
            displayToast({
                text: t("pages.plants.import.success"),
                type: "success",
            });
        } catch (error) {
            switch (error) {
                case ApiErrors.PLANT_ALREADY_ADDED:
                    return displayToast({
                        text: t("errors.plantAlreadyAdded"),
                        type: "info",
                    });
                case ApiErrors.INVALID_PLANT:
                    return displayToast({
                        text: t("errors.plantNotExists"),
                        type: "error",
                    });
                default:
                    return displayToast({
                        text: t("errors.general"),
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
                    <IconContainer
                        style={{ top: 20, right: 20 }}
                        onPress={() => {
                            setShowHelpModal(true);
                        }}
                    >
                        <AntDesign
                            name="question"
                            size={ICON_SIZE_PX}
                            color={theme.textLight}
                        />
                    </IconContainer>
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
                                            onPress={
                                                handleSubmit as (
                                                    values: unknown
                                                ) => void
                                            }
                                            text={t("common.confirm")}
                                        />
                                    </View>
                                </InputsWrapper>
                            )}
                        </Formik>
                    ) : (
                        <Loader />
                    )}
                </ColumnCenterWrapper>
            </KeyboardScreen>
            <BasicModal
                showModal={showHelpModal}
                toggleModal={setShowHelpModal}
            >
                <ModalItem>
                    <Description>
                        {t("pages.plants.import.description")}
                    </Description>
                </ModalItem>
                <ModalItem>
                    <BasicButton
                        onPress={() => setShowHelpModal(false)}
                        text={t("common.close")}
                    />
                </ModalItem>
            </BasicModal>
        </>
    );
};

export default ImportPlant;
