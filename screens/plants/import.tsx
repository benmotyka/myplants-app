import React from "react";
import { Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { View } from "react-native";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import BasicButton from "components/BasicButton/BasicButton";
import Loader from "components/Loader/Loader";
import { Plant } from "interfaces/Plant";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  KeyboardScreen,
} from "styles/shared";
import i18n from "../../i18n";

type ImportPlantProps = NativeStackScreenProps<RootStackParamList, "importPlant">;

const { t } = i18n;

const ImportPlant = ({ navigation }: ImportPlantProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const { userPlants }: { userPlants: Plant[] } = useSelector(
    (state: State) => state.plants
  );

  return (
    <KeyboardScreen
      contentContainerStyle={{ paddingBottom: 50 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      bounces={false}
    >
      <ColumnCenterWrapper>
        <Back navigation={navigation} />

        {!loading ? (
          <Formik
            initialValues={{
              plantShareId: "",
            }}
            onSubmit={() => console.log("hej")}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <InputsWrapper>
                <BasicTextInput
                  value={values.plantShareId}
                  label={t("common.plantShareId")}
                  placeholder={t("pages.plants.edit.plantNamePlaceholder")}
                  onChangeText={handleChange("plantShareId")}
                  onBlur={handleBlur("plantShareId")}
                  error={errors.plantShareId}
                />
                <View style={{ marginVertical: 30 }}>
                  <BasicButton
                    onPress={handleSubmit as (values: unknown) => void}
                    text={t("pages.plants.edit.submit")}
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
  );
};

export default ImportPlant;
