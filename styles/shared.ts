import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MotiView } from "moti";

import { colors } from "styles/colors";

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

export const KeyboardScreen = styled(KeyboardAwareScrollView)``;

export const ColumnCenterWrapper = styled.View<{ fullHeight?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0 50px;
  height: ${(props) => (props.fullHeight ? "100%" : "auto")};
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
  border-radius: 25px;
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
  color: ${colors.black};
`;

export const SmallHeader = styled.Text`
  font-size: 22px;
  text-align: left;
  font-family: "Inter_300Light";
  color: ${colors.black};
`;

export const SmallHeaderWrapper = styled.View`
  padding: 0 25px;
  width: 100%;
  margin-bottom: 10px;
`;

export const LoaderWrapper = styled.View`
  margin-top: 100px;
`;

export const Description = styled.Text`
  font-size: 13px;
  font-family: "Inter_300Light";
  opacity: 0.6;
  line-height: 18px;
`;

export const ModalAnimationWrapper = styled(MotiView)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
`;
