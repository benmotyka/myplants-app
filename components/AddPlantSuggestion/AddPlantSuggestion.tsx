import React from "react";

import { TutorialContainer, Image, ImageWrapper, TutorialText } from "components/AddPlantSuggestion/AddPlantSuggestion.styles";
import i18n from "../../i18n";

const AddPlantSuggestion = (): JSX.Element => {
const { t } = i18n;

  return (
    <TutorialContainer>
      <TutorialText>{t('components.addPlantSuggestion')}</TutorialText>
      <ImageWrapper>
      <Image source={require("../../assets/arrow.png")} />
      </ImageWrapper>
    </TutorialContainer>
  );
};

export default AddPlantSuggestion;
