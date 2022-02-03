import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import emojiss from "../../../services/emojis.json";

export const EmojiSelectScreen = ({ navigation }) => {
  const [searchfield, setSearchfield] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const [emojis, setEmojis] = useState(emojiss);

  useEffect(() => {
    const filteredEmojis = emojiss["EmojiKorean"].filter((emoji) => {
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
      <View>
        <TextInput
          placeholder="이모지를 검색하세요"
          onChangeText={(text) => {
            setSearchfield(text);
          }}
        ></TextInput>
      </View>
      <FlatList
        numColumns={8}
        data={emojis}
        renderItem={renderItem}
        keyExtractor={(item) => item.emoji}
      ></FlatList>
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
