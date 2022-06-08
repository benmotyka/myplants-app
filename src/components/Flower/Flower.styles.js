import { StyleSheet } from "react-native";

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
  }
});
