import React from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";

import { ContainerStart, ContainerEnd4 } from "../map.screen.styles";

import cloud from "../../../../../assets/cloud.png";
import FeedTransitionButton from "../../../../../assets/FeedTransitionButton";
import searchButton from "../../../../../assets/searchButton";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../../components/typography/text.component";

export const Cloud = () => {
  return (
    <>
      <View>
        <ImageBackground
          source={cloud}
          style={{
            width: "100%",
            height: "93%",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ContainerStart>
              <TouchableOpacity
                style={{
                  marginTop: 60,
                  marRight: 50,
                }}
              >
                <SvgXml xml={FeedTransitionButton} height={35} width={35} />
              </TouchableOpacity>
            </ContainerStart>
            <View
              style={{
                flex: 4,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 63,
                }}
              >
                <Text variant="bold">탭해서 새로고침</Text>
              </TouchableOpacity>
            </View>
            <ContainerEnd4>
              <TouchableOpacity
                style={{
                  marginTop: 64,
                }}
              >
                <SvgXml xml={searchButton} height={25} width={25} />
              </TouchableOpacity>
            </ContainerEnd4>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};