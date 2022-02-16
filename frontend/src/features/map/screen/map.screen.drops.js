import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { useEffect, useContext, useState } from "react";
import { LocationContext } from "../../../services/location/location.context";

import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/Buttons/write";

import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import axios from "axios";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
const SearchContainer = styled.View`
  position: absolute;
  z-index: 999;
top: 5px
  width: 100%;
`;

const Container = styled.View`
position: absolute
flex-direction: row
padding: ${(props) => props.theme.space[3]};
  z-index: 999;
  bottom: 67px

  width: 100%;
`;

const ContainerEnd = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  z-index: 999;
  bottom: -8px
  flex: 1;
  width: 100%;
`;

export default DropsOnMap = ({ navigation, route }) => {
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [drops, setDrops] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // api에 요청 보내서 드롭들 반환받는 함수
  const fetchDrops = async () => {
    try {
      // 요청이 시작될 때는 error와 drops를 초기화
      setError(null);
      setDrops(null);
      // loading 상태는 true
      setLoading(true);
      await axios({
        method: "GET",
        url: "http://localhost:3000/drops/",
      })
        .then((res) => {
          setDrops(res.data.data);

          setLoading(false);
        })
        .catch((error) => console.log("error = " + error));
    } catch (e) {
      console.log("catch error" + e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDrops();
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>error occured!</Text>;
  }
  if (!drops) {
    return null;
  } // 반환받은 드롭들을 반복문을 통해 mapview.marker로 바꾸고, 반환하는 함수.
  const dropsList = (drops) => {
    return drops.map((drop) => {
      return (
        <MapView.Marker
          key={drop.pk}
          title={drop.content}
          coordinate={{
            latitude: drop.latitude,
            longitude: drop.longitude,
          }}
        />
      );
    });
  };
  return (
    <>
      <ExpoStatusBar style="auto" />

      <SearchContainer>
        <Image source={cloud} height={542} width={158} />
      </SearchContainer>
      <Map
        provider={PROVIDER_GOOGLE}
        onPress={(event) => {
          console.log(event.nativeEvent.coordinate);
        }}
        region={{
          latitude: 37.423375325225734,
          longitude: 127.02300041913986,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {/* dropsList 부분에서 dropsList 함수의 반환값들을 렌더링한다. */}
        {dropsList(drops)}
      </Map>
      {/* + 버튼 부분  */}
      <Container>
        <TouchableOpacity onPress={fetchDrops}>
          <SvgXml xml={write} width={56} height={65} />
        </TouchableOpacity>
        {/* 현재 위치로 이동하는 버튼 부분 */}
        <ContainerEnd />
      </Container>
    </>
  );
};
