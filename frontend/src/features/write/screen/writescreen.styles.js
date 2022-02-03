import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
const utils = StyleSheet.create({
  ////////////////////////
  margin15: {
    margin: 15,
  },

  /////////////////////
  backgroundWhite: {
    backgroundColor: "white",
  },

  borderTopGray: {
    borderTopWidth: 1,
    borderColor: "lightgrey",
  },
  borderWhite: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "white",
  },
  ////////////
});

const container = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerImage: {
    flex: 1 / 3,
  },
  image: {
    aspectRatio: 1 / 1,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.secondary,
    flexDirection: "column",
    flex: 1,
  },
  containerTop: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: theme.colors.bg.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginRight: 80,
  },
  addIcon: {
    justifyContent: "center",
  },
  sendingButton: {
    marginLeft: 65,
  },

  textContainer: {
    backgroundColor: theme.colors.bg.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
  },

  place: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  address: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  bar: {
    padding: 15,
  },

  enter: {
    fontSize: 20,
    fontWeight: "500",
    color: "#9A9A9A",
    textAlign: "center",
  },

  containerLow: {
    backgroundColor: theme.colors.bg.secondary,
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addPicture: {
    marginRight: 70,
  },
  LockButtonUnlocked: {
    marginLeft: 70,
  },
});
export { container, styles, utils };
