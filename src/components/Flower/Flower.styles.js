import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listItemContainer: {
    flex: 1 / 2,
    padding: 5,
    display: "flex",
  },
  listItem: {
    backgroundColor: "#F0ECE3",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    borderRadius: 15,
    display: "flex",
  },
  listItemImage: {
    width: "100%",
    height: "60%",
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
