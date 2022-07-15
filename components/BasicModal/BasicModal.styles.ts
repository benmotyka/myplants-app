import styled from "styled-components/native";
import { colors } from "../../styles/colors";

export const ModalContainer = styled.TouchableOpacity`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalWrapper = styled.View`
width: 80%;
max-width: 400px;
border-radius: 10px;
background-color: ${colors.lightGrey};
padding: 15px;
`

export const ModalHeader = styled.Text`
font-size: 24px;
text-align: center;
font-family: 'Inter_300Light';
`

export const ModalItem = styled.View`
margin: 15px;
`