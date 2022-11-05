import styled from "styled-components/native";

export const TutorialContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Image = styled.Image`
  width: 100px;
  height: 60px;

  opacity: 0.1;
`;

export const ImageWrapper = styled.View`
  position: absolute;
  right: 5px;
  bottom: 70px;
`;

export const TutorialText = styled.Text`
  position: absolute;
  right: 10px;
  bottom: 125px;

  font-family: 'AkayaKanadaka_400Regular'
  font-size: 26px;
  color: ${({ theme }) => theme.neutral};
  opacity: 0.8;
`;
