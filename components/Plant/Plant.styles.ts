import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export default StyleSheet.create({
  flowerContainer: {
    flex: 1 / 2,
    padding: 5,
    display: "flex",
    position: "relative",
  },
  flowerWrapper: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 230,
    borderRadius: 3,
    display: "flex",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  flowerImage: {
    width: "100%",
    height: "60%",
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  flowerBody: {
    position: "absolute",
    height: "40%",
    top: "60%",
    width: "100%",
    padding: 5,
  },
  flowerHeader: {
    fontSize: 16,
  },
});

export const Container = styled.View`
  width: 50%;
  height: 250px;
  padding: 2px;
`;

export const Wrapper = styled.View`
  /* flex: 1 / 2; */
  /* backgroundcolor: "#fff";
  justifycontent: center;
  alignitems: center;
  height: 230px;
  borderradius: 3px;
  display: flex; */
  border: 1px solid #000;
  backgroundcolor: red;
  height: 100%;
  position: relative;
`;

export const Image = styled.Image`
  width: 100%;
  height: 60%;
  position: absolute;
`;

export const Body = styled.View`
  position: absolute;
  height: 40%;
  top: 60%;
  width: 100%;
  padding: 5px;
`;

export const Header = styled.Text`
  fontsize: 16;
`;
