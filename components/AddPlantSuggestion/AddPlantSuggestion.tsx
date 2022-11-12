import React from "react";

import {
  TutorialContainer,
  Image,
  ImageWrapper,
  TutorialText,
} from "components/AddPlantSuggestion/AddPlantSuggestion.styles";
import { useAppConfigStore } from "store";
import i18n from "../../i18n";

const AddPlantSuggestion = (): JSX.Element => {
  const { t } = i18n;
  const appTheme = useAppConfigStore((state) => state.theme);

  return (
    <TutorialContainer>
      <TutorialText>{t("components.addPlantSuggestion")}</TutorialText>
      <ImageWrapper>
        <Image
          source={
            appTheme === "dark"
              ? require("../../assets/arrow-light.png")
              : require("../../assets/arrow.png")
          }
        />
      </ImageWrapper>
    </TutorialContainer>
  );
};

export default AddPlantSuggestion;
