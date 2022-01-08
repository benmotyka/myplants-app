import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#FFF8F3",
    height: "100%",
    width: "100%",
    fontFamily: "Inter_200ExtraLight",
  },
  menuNavigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "row",
  },
  menuNavigatorItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    height: "100%",
  },
  menuNavigatorButtonActive: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#FEECE9",
  },
  menuNavigatorButton: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  menuNavigatorText: {
    fontSize: 12,
    fontFamily: "Inter_200ExtraLight",
  },
  homeListContainer: {
    flex: 1,
    padding: 5
  },
  homeListItem: {
    backgroundColor: "#F0ECE3",
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: "100%",
    borderRadius: 15
  }
});
