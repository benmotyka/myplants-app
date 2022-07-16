import styled from "styled-components/native";

import { colors } from "styles/colors";

export const TutorialContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Image = styled.Image`
  width: 100px;
  height: 150px;

  opacity: 0.1;
`;

export const ImageWrapper = styled.View`
  position: absolute;
  right: 10px;
  bottom: 35px;

  transform: rotate(200deg);
`;

export const TutorialText = styled.Text`
  position: absolute;
  right: 10px;
  bottom: 125px;

  font-family: 'AkayaKanadaka_400Regular'
  font-size: 26px;
  color: ${colors.grey};
  opacity: 0.8;
`;
