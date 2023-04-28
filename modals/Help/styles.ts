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
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SliderContainer = styled.View`
    width: ${plantWidthPercentage};
    margin-top: 180px;
`;

export const TextWrapper = styled.View`
    display: flex;
    width: 100%;
`;

export const Text = styled.Text`
    font-family: "AkayaKanadaka_400Regular";
    font-size: 26px;
    color: ${({ theme }) => theme.white};
    padding: 10px;
    max-width: 50%;
`;
