import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SvgXml } from "react-native-svg";
import edit from "../../../../assets/edit";
import dropIcon from "../../../../assets/dropIcon";
import pictureIcon from "../../../../assets/pictureIcon";
import CommentIcon from "../../../../assets/CommentIcon";
import HeartIcon from "../../../../assets/HeartIcon";
import emptyHeart from "../../../../assets/emptyHeart";
import LikeButton from "../../../../assets/LikeButton";
import sendingAirplane from "../../../../assets/sendingAirplane";
import { theme } from "../../../infrastructure/theme";

export const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="black" />

      <View style={styles.dropContainer}>
        <ScrollView horizontal={true} style={styles.imageContainer}>
          <View style={styles.pictureInput}></View>
          <View style={styles.pictureInput}></View>
          <View style={styles.pictureInput}></View>
          <View style={styles.pictureInput}></View>
        </ScrollView>

        <View style={styles.restContainer}>
          <View style={styles.iconContainer}>
            <SvgXml
              xml={pictureIcon}
              width={19}
              height={21}
              style={styles.pictureIcon}
            ></SvgXml>
            <Text style={styles.pictureNumber}>5</Text>
            <SvgXml
              xml={CommentIcon}
              width={19}
              height={21}
              style={styles.CommentIcon}
            ></SvgXml>
            <Text style={styles.commentNumber}>3</Text>
            <SvgXml
              xml={HeartIcon}
              width={19}
              height={21}
              style={styles.HeartIcon}
            ></SvgXml>
            <Text style={styles.heartNumber}>2</Text>
          </View>
          <TouchableOpacity>
            <SvgXml
              xml={LikeButton}
              width={85}
              height={29}
              style={styles.LikeButton}
            ></SvgXml>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentContainer}>
        <View style={styles.comment1Container}>
          <Text style={styles.user1}>드로퍼1</Text>

          <View style={styles.inner1}>
            <Text style={styles.commet1}>오늘 저도 인촌기념관 갔는데...!</Text>
            <View style={styles.bottom1}>
              <Text style={styles.time1}>57분</Text>
              <TouchableOpacity>
                <Text style={styles.reply}>답글달기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity>
            <SvgXml
              xml={emptyHeart}
              width={19}
              height={21}
              style={styles.emptyHeart}
            ></SvgXml>
          </TouchableOpacity>
        </View>

        <View style={styles.comment2Container}>
          <Text style={styles.user2}>드로퍼2</Text>

          <View style={styles.inner2}>
            <Text style={styles.commet2}>
              요즘 진짜 캠퍼스 투어하기 딱인 날씨ㄹㅇ...
            </Text>
            <View style={styles.bottom2}>
              <Text style={styles.time2}>30분</Text>
              <Text style={styles.like2}>좋아요 1개</Text>
              <TouchableOpacity>
                <Text style={styles.reply}>답글달기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity>
            <SvgXml
              xml={emptyHeart}
              width={19}
              height={21}
              style={styles.emptyHeart}
            ></SvgXml>
          </TouchableOpacity>
        </View>

        <View style={styles.comment3Container}>
          <Text style={styles.user3}>드로퍼3</Text>

          <View style={styles.inner3}>
            <Text style={styles.commet3}>인촌기념관은 야경이 죽이죠,,</Text>
            <View style={styles.bottom3}>
              <Text style={styles.time3}>16분</Text>
              <TouchableOpacity>
                <Text style={styles.reply}>답글달기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.replyContainer}>
              <View style={styles.replyBar}></View>
              <TouchableOpacity>
                <Text style={styles.showReply}>답글 1개 보기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity>
            <SvgXml
              xml={emptyHeart}
              width={19}
              height={21}
              style={styles.emptyHeart}
            ></SvgXml>
          </TouchableOpacity>
        </View>

        <View style={styles.commentButton}>
          <TouchableOpacity>
            <Text style={styles.enterComment}>댓글 입력하기...</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgXml
              xml={sendingAirplane}
              width={35}
              height={35}
              style={styles.sendingAirplane}
            ></SvgXml>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.white,
    alignItems: "center",
  },

  containerTop: {
    marginTop: 50,
    flexDirection: "row",
  },

  textContainer: {
    flexDirection: "column",
    width: 330,
  },
  editContainer: {
    marginTop: 10,
  },
  place: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginLeft: 25,
  },
  address: {
    fontSize: 11,
    fontWeight: "500",
    color: "#B4B1B1",
    marginLeft: 25,
  },

  dropContainer: {
    margin: 10,
    borderRadius: 10,
    width: 340,
    height: 300,
    backgroundColor: "#EDEDED",
  },

  contentContainer: {
    flexDirection: "row",
  },
  dropIcon: {
    marginLeft: 20,
    marginTop: 10,
  },

  writingContainer: {
    flexDirection: "column",
    width: 260,
  },
  timeContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "#817B7B",
    fontWeight: "500",
  },
  content: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "500",
    marginTop: 5,
    marginLeft: 20,
    color: "black",
  },
  hashtag: {
    fontSize: 14,
    fontWeight: "500",
    color: "#817B7B",
    marginLeft: 20,
  },

  pictureInput: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 12,
    borderRadius: 5,
    backgroundColor: "skyblue",
  },

  restContainer: {
    flexDirection: "column",
    marginTop: 25,
    alignItems: "flex-start",
  },

  iconContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  pictureIcon: {
    marginLeft: 15,
  },
  pictureNumber: {
    marginRight: 12,
    color: "#9C4A97",
  },
  commentNumber: {
    marginRight: 12,
    color: "#9C4A97",
  },
  heartNumber: {
    color: "#FB1919",
  },
  LikeButton: {
    margin: 10,
  },
  commentContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  comment1Container: {
    flexDirection: "row",
  },
  comment2Container: {
    flexDirection: "row",
    marginTop: 20,
  },
  comment3Container: {
    flexDirection: "row",
    marginTop: 20,
  },
  inner1: {
    flexDirection: "column",
    marginLeft: 20,
    width: 240,
  },
  inner2: {
    flexDirection: "column",
    marginLeft: 20,
    width: 240,
  },
  inner3: {
    flexDirection: "column",
    marginLeft: 20,
    width: 240,
  },
  bottom1: {
    flexDirection: "row",
    marginTop: 5,
  },
  bottom2: {
    flexDirection: "row",
    marginTop: 10,
  },
  bottom3: {
    flexDirection: "row",
    marginTop: 10,
  },
  user1: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  commet1: {
    fontSize: 15,
    fontWeight: "500",
  },
  time1: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },
  reply: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 20,
  },
  emptyHeart: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  user2: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  commet2: {
    fontSize: 15,
    fontWeight: "500",
  },
  time2: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },

  like2: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 20,
  },
  user3: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  commet3: {
    fontSize: 15,
    fontWeight: "500",
  },
  time3: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },

  emptyHeart: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },

  replyContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  replyBar: {
    width: 35,
    height: 2,
    backgroundColor: "#C4C4C4",
    alignSelf: "center",
  },
  showReply: {
    color: "#C4C4C4",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 10,
  },

  commentButton: {
    backgroundColor: "white",
    width: 340,
    margin: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  enterComment: {
    color: "#C4C4C4",
    fontSize: 17,
    fontWeight: "500",
    paddingLeft: 20,
    width: 295,
  },
});
