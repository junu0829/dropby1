import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";

import { theme } from "../../../infrastructure/theme";
import emojiss from "../../../services/emojis.json";

export const EmojiSelectScreen = ({ navigation }) => {
  const [searchfield, setSearchfield] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("😀");

  const [emojis, setEmojis] = useState(emojiss);

  useEffect(() => {
    const filteredEmojis = emojiss.EmojiKorean.filter((emoji) => {
      return emoji.name.toString().includes(searchfield);
    });
    setEmojis(filteredEmojis);
    console.log(searchfield.toString());
  }, [searchfield]);

  const Item = ({ emoji }) => (
    <TouchableOpacity
      onPress={async () => {
        await setSelectedEmoji(emoji);
        console.log(selectedEmoji);
      }}
    >
      <View style={styles.item}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item emoji={item.emoji} />;

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ height: 270 }}>
        <View
          style={{
            flex: 2.5,
            width: Dimensions.get("window").width,

            justifyContent: "flex-start",
          }}
        >
          <TextInput
            style={{
              fontSize: 17,
              left: 10,
              top: 30,
              padding: 5,
              paddingLeft: 15,
              height: 37,
              width: "95%",
              borderColor: theme.colors.bg.a,
              borderWidth: 2,
              borderRadius: 15,
            }}
            placeholder="이모지를 검색하세요"
            onChangeText={(text) => {
              setSearchfield(text);
            }}
          />
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              height: 120,
              fontSize: 100,
            }}
          >
            {selectedEmoji}
          </Text>
          <TouchableOpacity
            style={{
              height: 50,

              top: 0,
            }}
            onPress={() => {
              setSelectedEmoji(
                emojis[Math.floor(Math.random() * emojis.length)].emoji
              );
            }}
          >
            <Text
              style={{
                color: theme.colors.bg.b,
                fontWeight: "800",
                top: 0,
              }}
            >
              랜덤으로 고르기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,

              top: 0,
            }}
            onPress={() => {
              navigation.navigate({
                name: "WriteScreen",
                params: { selectedEmoji },
                merge: true,
              });
            }}
          >
            <Text
              style={{
                color: theme.colors.bg.b,
                fontWeight: "800",
                top: 0,
              }}
            >
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{ top: 15 }}
        numColumns={8}
        data={emojis}
        renderItem={renderItem}
        keyExtractor={(item) => item.emoji}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 45,
    height: 45,
  },
  emoji: {
    fontSize: 38,
  },
});
