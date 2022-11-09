import styled from "styled-components/native";
import { MotiView } from "moti";


export const ToastText = styled.Text`
  font-size: 22px;
  text-align: center;
  color: ${({ theme }) => theme.white};  // should be always white
  opacity: 0.9;
`;

export const ToastCancelText = styled(ToastText)`
  margin-left: 20px;
  opacity: 0.6;
  font-size: 18px;
`;

export const ToastWrapper = styled(MotiView)<{
  backgroundColor: string;
}>`
  width: max-content;
  max-width: 350px;
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  margin: 0 auto;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
