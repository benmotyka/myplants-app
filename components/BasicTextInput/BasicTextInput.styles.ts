import styled from "styled-components/native";
import { colors } from "../../styles/colors";

export const InputWrapper = styled.View`
margin: 10px 0;
width: 100%;
` 

export const Input = styled.TextInput`
width: 100%;
padding: 10px;
font-size: 20px;
border: 1px solid ${colors.grey};
border-radius: 5px;
font-family: 'Inter_200ExtraLight';
`

export const InputLabel = styled.Text`
font-size: 18px;
font-family: 'Inter_300Light';
margin-bottom: 5px;
`