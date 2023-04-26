import styled from "styled-components/native";

export const Wrapper = styled.View<{ topMargin?: boolean }>`
    margin-top: ${(props) => (props.topMargin ? `100px` : `0`)};
`;
