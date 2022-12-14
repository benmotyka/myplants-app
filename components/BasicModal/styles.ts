import styled from "styled-components/native";

export const ModalContainer = styled.View`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalBackground = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWrapper = styled.View`
    width: 80%;
    max-width: 400px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background};
    padding: 15px;
    position: absolute;
    border: ${({ theme }) => `1px solid ${theme.neutral}}`};
`;

export const ModalHeader = styled.Text`
    font-size: 20px;
    text-align: center;
    font-family: "Inter_300Light";
    color: ${({ theme }) => theme.text};
`;

export const ModalItem = styled.View`
    margin: 15px;
`;

export const ModalDescription = styled.Text`
    font-size: 15px;
    font-family: "Inter_300Light";
    opacity: 0.6;
    margin-top: 10px;
    color: ${({ theme }) => theme.text};
`;

export const ModalImage = styled.Image`
    width: 100%;
    height: 300px;
`;
