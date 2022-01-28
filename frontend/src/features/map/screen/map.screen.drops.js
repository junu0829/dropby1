import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { LocationContext } from "../../../services/location/location.context";

import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import cloud from "../../../../assets/cloud.png";
import write from "../../../../assets/write";
import currentLocationn from "../../../../assets/currentLocation";
import currentLocation from "../../../../assets/currentLocation";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import axios from 'axios';
import Loading from '../../../components/Loading';
import { useScrollToTop } from "@react-navigation/native";
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

    const fetchDrops = async() => {
        try {
            // 요청이 시작될 때는 error와 drops를 초기화
            setError(null);
            setDrops(null);
            // loading 상태는 true
            setLoading(true);
            await axios({
                method:'GET',
                url:'http://192.168.0.18:3000/drops/'
            }).then((res) => {
                console.log('##1111');
                console.log('res is' + res );
                console.log(res.data.data);
                // console.log(res.status);
                // console.log(res.statusText);
                // console.log(res.request);
                console.log('res.data is ' + res.data.data);
                console.log('#2222222');
                setDrops(res.data.data);
                console.log('#3333333');
                setLoading(false);
                console.log('drops -----------')
                console.log('#4444444444444')
                console.log(drops);

            }).catch(error => console.log('error = ' + error));
            // await axios.get('http://192.168.0.18:3000/drops/')
            // .then(res => {
            //     console.log('res : ' + res.body);
            //     console.log('res.data : ' + res.data[1]);
            //     setLoading(false);
            //     console.log('drops -----------')
            //     console.log(drops);
            //     setDrops(res.data[1]);

            // }).catch(error => console.log('error = ' + error));

        } catch(e) {
            console.log('catch error' + e);
        }
        setLoading(false);
        console.log('drops2' + '---------------')
        console.log(drops);
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
    }
    const dropsList = (drops) => {
        return drops.map(drop => {
            return (<MapView.Marker
                        key={drop.pk}
                        title={drop.content}
                        coordinate={{
                            latitude:drop.latitude,
                            longitude:drop.longitude
                        }}
                        ></MapView.Marker>)
        })
    };
    return (
        <>
            <ExpoStatusBar style="auto"></ExpoStatusBar>

            <SearchContainer>
                <Image source={cloud} height={542} width={158}></Image>
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

                {dropsList(drops)}
                {/* 이게 현재 위치 찍는 마커 */}
                {/* {drops.map(drop => (
                    <MapView.Marker
                        key={drop.pk}
                        title={drop.content}
                        coordinate={{
                            latitude:drop.latitude,
                            longitude:drop.longitude
                        }}
                        ></MapView.Marker>
                ))} */}
                {/* <MapView.Marker
                    key={"you"}
                    title={"you"}
                    coordinate={{
                        latitude: location[0],
                        longitude: location[1],
                    }}
                ></MapView.Marker> */}
            </Map>
            {/* + 버튼 부분  */}
            <Container>
                <TouchableOpacity onPress={fetchDrops}>
                    <SvgXml  xml={write} width={56} height={65} />
                </TouchableOpacity>
                {/* 현재 위치로 이동하는 버튼 부분 */}
                <ContainerEnd>

                    {/* <TouchableOpacity>
                        <SvgXml xml={currentLocation} width={50} height={50} />
                    </TouchableOpacity> */}
                </ContainerEnd>
            </Container>
        </>
    );
};
