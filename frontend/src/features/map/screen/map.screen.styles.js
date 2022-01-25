import styled from "styled-components/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { StyleSheet } from "react-native";

//style 정의하는 부분: css style로 벡틱안에서 정의하게 됨
export const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
export const SearchContainer = styled.View`
  position: absolute;
  z-index: 999;

  width: 100%;
`;

export const Container = styled.View`
position: absolute
flex-direction: row
padding: ${(props) => props.theme.space[3]};
  z-index: 998;
  bottom: 67px

  width: 100%;
 
`;

export const PlaceContainer = styled.View`
position: absolute
backgroundColor: #FAFAFA
flex-direction: row
padding: ${(props) => props.theme.space[3]};
  z-index: 998;
  bottom: 0px
height: 165px
  width: 100%;
 
`;

export const ContainerEnd = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  z-index: 999;
  bottom: -8px
  flex: 1;
  width: 100%;
`;

export const TextContainer = styled.View`
flex:3
flex-direction: column;
justify-content: flex-end;
top: 75px
align-items: center;
  width: 100%;
  z-index: 999;
 
`;

export const PlaceNameContainer = styled.View`
flex:5
flex-direction: column;
justify-content: flex-start;

align-items: flex-start;

 
`;

export const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 210,
  },
});
