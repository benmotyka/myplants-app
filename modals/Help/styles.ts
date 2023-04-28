import { plantWidthPercentage } from "components/Plant/styles";
import styled from "styled-components/native";
import { DarkScreenOverlay } from "styles/shared";

export const ScreenOverlay = styled(DarkScreenOverlay)`
    display: flex;
    flex-direction: row;
`;

export const PlantContainer = styled.View`
    width: ${plantWidthPercentage};
    height: 250px;
    padding: 5px;
    border: ${({ theme }) => `3px solid ${theme.primaryLight}`};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SliderContainer = styled(PlantContainer)`
    margin-top: 195px;
    height: 45px;
`;

export const Text = styled.Text`
    font-family: "AkayaKanadaka_400Regular";
    font-size: 26px;
    color: ${({ theme }) => theme.white};
    padding: 20px;
`;
