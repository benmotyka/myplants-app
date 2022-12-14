import styled from "styled-components/native";

export const FieldContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    max-width: 400px;
    border-radius: 5px;
    border: ${({ theme }) => `1px solid ${theme.neutralLight}`};
`;

export const FieldValue = styled.Text`
    padding: 10px 15px;
    font-size: 18px;
    font-family: "Inter_300Light";
    opacity: 0.8;
    width: 75%;
    color: ${({ theme }) => theme.text};
`;

export const ButtonWrapper = styled.TouchableOpacity`
    width: 25%;
    font-family: "Inter_300Light";
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.neutralLight};
    /* prettier-ignore */
    borderTopRightRadius: 5px;
    /* prettier-ignore */
    borderBottomRightRadius: 5px;
`;

export const InfoWrapper = styled.View`
    height: 25px;
`;

export const Info = styled.Text`
    font-family: "Inter_300Light";
    font-size: 15px;
    opacity: 0.6;
    text-align: center;
    padding: 5px 0;
    color: ${({ theme }) => theme.text};
`;
