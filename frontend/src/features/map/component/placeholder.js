import { SvgXml } from "react-native-svg";

import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import backButton from "../../../../assets/backButton";
import Drops from "../../../../assets/Drops";

import SelectPlace from "../../../../assets/SelectPlace";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}></View>

      <View style={styles.cardContainer2}>
        <View style={styles.card1}>
          <Text style={styles.placename}>고려대학교 인촌기념관</Text>

          <Text style={styles.placeaddress}>
            서울 성북구 안암로 145(안암동 5가)
          </Text>

          <Text style={styles.place}>학교부속시설</Text>

          <Text style={styles.drop}>23개</Text>
        </View>

        <View style={styles.card2}>
          <SvgXml xml={Drops} width={38} height={42} />

          <TouchableOpacity style={styles.GoBack}>
            <SvgXml xml={backButton} width={56} height={55} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.SelectPlace}>
            <SvgXml xml={SelectPlace} width={207} height={43} />
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "column",
  },

  cardContainer: {
    flex: 4,
  },

  cardContainer2: {
    flex: 1,

    backgroundColor: "#ff80ff",
  },

  card1: {},

  placename: {
    fontSize: 17,

    fontWeight: "700",

    marginTop: 15,

    marginLeft: 20,
  },

  placeaddress: {
    fontSize: 10,

    fontWeight: "700",

    marginTop: 4,

    marginLeft: 20,
  },

  place: {
    fontSize: 10,

    fontWeight: "700",

    marginTop: -31,

    marginLeft: 180,
  },

  drop: {
    fontSize: 17,

    fontWeight: "700",

    marginTop: -16,

    marginLeft: 345,
  },

  card2: {},

  Drops: {
    resizeMode: "contain",

    marginTop: 15,

    marginLeft: 10,
  },

  GoBack: {
    marginTop: 20,

    marginLeft: 30,
  },

  SelectPlace: {
    marginTop: 15,

    marginLeft: 20,
  },
});
