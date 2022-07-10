import styled from "styled-components/native";
import { colors } from "../styles/colors";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ScreenContainer = styled.View`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const KeyboardScreen = styled(KeyboardAwareScrollView)`
`

export const ColumnCenterWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

export const InputsWrapper = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${colors.lightGrey};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const MarginTopView = styled.View`
  margin-top: 50px;
`;

export const Header = styled.Text`
  font-size: 40px;
  text-align: left;
  font-family: "Inter_300Light";
  margin-bottom: 20px;
`;

export const LoaderWrapper = styled.View`
margin-top: 100px;
`