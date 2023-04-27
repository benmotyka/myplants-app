import { plantWidthPercentage } from "components/Plant/styles";
import styled from "styled-components/native";
import { DarkScreenOverlay } from "styles/shared";

export const ScreenOverlay = styled(DarkScreenOverlay)`
    display: flex;
    flex-direction: row;
`;

export const Container = styled.View`
    width: ${plantWidthPercentage};
    height: 250px;
    padding: 5px;
    border: ${({ theme }) => `5px solid ${theme.textLight}`};
    border-radius: 20px;
`;

export const Text = styled.Text`
    font-family: "AkayaKanadaka_400Regular";
    font-size: 26px;
    color: ${({ theme }) => theme.textLight};
    opacity: 0.8;
    padding: 20px;
`;
