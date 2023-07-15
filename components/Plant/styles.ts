import styled from "styled-components/native";

import { screenWidth } from "styles/shared";

const MAX_PLANT_WIDTH = 240;

export const numberOfColumns = Math.round(screenWidth / MAX_PLANT_WIDTH);
export const plantWidthPercentage = numberOfColumns === 2 ? "50%" : "33%";

export const Container = styled.View`
    width: ${plantWidthPercentage};
    height: 250px;
    padding: 5px;
`;

export const Wrapper = styled.View<{
    showWateringReminder?: boolean;
}>`
    border: ${(props) =>
        `2px solid ${
            props.showWateringReminder
                ? props.theme.primary
                : props.theme.neutral
        }`};
    height: 100%;
    position: relative;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;

export const Image = styled.Image`
    width: 100%;
    height: 70%;
    position: absolute;
    /* prettier-ignore */
    borderTopLeftRadius: 10px;
    /* prettier-ignore */
    borderTopRightRadius: 10px;
`;

export const SmallImage = styled.Image`
    width: 9px;
    height: 17px;
    margin-right: 3px;
`;

export const ResetImageWrapper = styled.TouchableOpacity`
    margin: 0 5px 5px auto;
`

export const ResetImage = styled.Image`
    width: 25px;
    height: 25px;
    rotate: 180deg;
`;

export const Body = styled.View`
    position: absolute;
    height: 30%;
    top: 70%;
    width: 100%;
    padding: 5px;
`;

export const Header = styled.Text`
    font-size: 15px;
    font-family: "Inter_200ExtraLight";
    color: ${({ theme }) => theme.text};
`;

export const ItemsWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const TimeWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const Text = styled.Text`
    font-family: "Inter_200ExtraLight";
`;
