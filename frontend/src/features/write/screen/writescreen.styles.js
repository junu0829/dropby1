import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
const utils = StyleSheet.create({
  centerHorizontal: {
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: 20,
  },
  marginBottomBar: {
    marginBottom: 330,
  },
  marginBottomSmall: {
    marginBottom: 10,
  },
  profileImageBig: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  profileImage: {
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  profileImageSmall: {
    marginRight: 15,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  searchBar: {
    backgroundColor: "whitesmoke",
    color: "grey",
    paddingLeft: 10,
    borderRadius: 8,
    height: 40,
    marginTop: -5,
  },
  justifyCenter: {
    justifyContent: "center",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  padding15: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  padding10Top: {
    paddingTop: 10,
  },
  padding10: {
    padding: 10,
  },
  margin15: {
    margin: 15,
  },
  padding10Sides: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  margin15Left: {
    marginLeft: 15,
  },
  margin15Right: {
    marginRight: 15,
  },
  margin5Bottom: {
    marginBottom: 5,
  },
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
  buttonOutlined: {
    padding: 8,
    color: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    textAlign: "center",
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

const container = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    flexDirection: "row",
  },
  input: {
    flexWrap: "wrap",
  },
  containerPadding: {
    flex: 1,
    padding: 15,
  },
  center: {
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    display: "flex",
  },
  form: {
    flex: 1,
    margin: 25,
  },
  profileInfo: {
    padding: 25,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
  },
  formCenter: {
    justifyContent: "center",
    flex: 1,
    margin: 25,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    aspectRatio: 1 / 1,
  },
  fillHorizontal: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  imageSmall: {
    aspectRatio: 1 / 1,
    height: 70,
  },
  gallery: {
    borderWidth: 1,
    borderColor: "gray",
  },
  splash: {
    padding: 200,
    height: "100%",
    width: "100%",
  },
  chatRight: {
    margin: 10,
    marginBottom: 10,
    backgroundColor: "dodgerblue",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  chatLeft: {
    margin: 10,
    marginBottom: 10,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-end",
    textAlign: "right",
    alignSelf: "flex-start",
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
