import React from "react";

import { useAppConfigStore } from "store";
import { TutorialContainer, Image, ImageWrapper, TutorialText } from "./styles";
import i18n from "config/i18n";

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
