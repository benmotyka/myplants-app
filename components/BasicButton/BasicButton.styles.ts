import styled from "styled-components/native";
import { colors } from "../../styles/colors";

export const ButtonWrapper = styled.TouchableOpacity`
paddingVertical: 10;
border-radius: 10;
background-color: ${colors.lightGrey};
border: 1px solid ${colors.black};
display: flex;
align-items: center;
justify-content: center;
width: 150px;
` 

export const ButtonText = styled.Text`
font-size: 16px;
`