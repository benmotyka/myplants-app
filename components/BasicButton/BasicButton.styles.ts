import styled from "styled-components/native";
import { colors } from "../../styles/colors";

export const ButtonWrapper = styled.TouchableOpacity`
paddingVertical: 10px;
paddingHorizontal: 10px;
border-radius: 10px;
background-color: ${colors.lightGrey};
border: 1px solid ${colors.grey};
display: flex;
align-items: center;
justify-content: center;
min-width: 150px;
` 

export const ButtonText = styled.Text`
font-family: 'Inter_300Light';
font-size: 18px;
`