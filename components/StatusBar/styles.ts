import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const Wrapper = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.background};
    /* prettier-ignore */
    paddingTop: ${StatusBar.currentHeight};
`;
