import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { MotiView } from "moti";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const ScreenContainer = styled.View`
    height: 100%;
    width: 100%;
    position: relative;
    background-color: ${({ theme }) => theme.background};
`;

export const KeyboardScreen = KeyboardAwareScrollView;

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
    background-color: ${({ theme }) => theme.background};
    border: ${({ theme }) => `1px solid ${theme.neutral}`};
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    z-index: 10;
`;

export const Header = styled.Text`
    font-size: 40px;
    text-align: left;
    font-family: "Inter_300Light";
    margin-bottom: 20px;
    color: ${({ theme }) => theme.text};
`;

export const SmallHeader = styled.Text`
    font-size: 22px;
    text-align: left;
    font-family: "Inter_300Light";
    color: ${({ theme }) => theme.text};
`;

export const SmallHeaderWrapper = styled.View`
    padding: 0 25px;
    width: 100%;
    margin-bottom: 10px;
`;

export const Description = styled.Text`
    font-size: 15px;
    font-family: "Inter_300Light";
    opacity: 0.7;
    line-height: 20px;
    color: ${({ theme }) => theme.text};
`;

export const ModalAnimationWrapper = styled(MotiView)`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
`;

export const ScrollableHeader = styled.ScrollView`
    margin-bottom: 10px;
    margin: 0 30px;
`;

export const HelperButton = styled(IconContainer)`
    top: 20;
    right: 20;
`;
