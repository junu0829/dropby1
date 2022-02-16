import styled from "styled-components/native";
import MapView from "react-native-maps";

import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";

//style 정의하는 부분: css style로 벡틱안에서 정의하게 됨
export const Map = styled(MapView)`
  height: 100%;
  width: 100%;
  z-index: 1;
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
  z-index: 990;
  bottom: 67px

  width: 100%;
 
`;

export const PlaceContainer = styled.View`
position: absolute
backgroundColor:  ${(props) => props.theme.colors.bg.secondary};
flex-direction: column
padding: ${(props) => props.theme.space[3]};
  z-index: 998;
  bottom: 0px
height: 165px
  width: 100%;
 
`;
export const PlaceContainer2 = styled.View`

flex-direction: row
flex: 1
 
`;

export const PlaceContainer3 = styled.View`

flex-direction: row
justify-content:center
flex: 1
bottom: 30px
 
`;

export const CurrentLocationButton = styled.TouchableOpacity`
  z-index: 999;
`;
export const WriteButton = styled.TouchableOpacity`
  z-index: 999;
`;
export const ContainerEnd = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  z-index: 995;
  bottom: -8px
  flex: 1;
  width: 100%;
`;

export const ContainerEnd2 = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  z-index: 995;
  bottom: -8px
  left: 5px;
  flex: 1;
  width: 100%;
`;
export const ContainerEnd3 = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  z-index: 995;
  bottom: -8px
  left: 5px;
  flex: 1;
  width: 100%;
`;

export const ContainerEnd4 = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  z-index: 995;
  right: 20px;
`;
export const ContainerStart = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  z-index: 995;
  left: 20px;
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
flex:3
left: 5px
right: 10px
flex-direction: column;
justify-content: flex-start;

align-items: flex-start;

 
`;

export const PlaceNameContainer2 = styled.View`

left: 5px
flex-direction: row;
justify-content: flex-start;

align-items: flex-start;

 
`;
export const SelectButtonContainer = styled.TouchableOpacity`
  bottom: -50px;
`;

export const BackButtonContainer = styled.TouchableOpacity`
  bottom: 0px;
`;

export const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 210,
  },
  placename: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    marginTop: 5,
    marginLeft: 2,
  },

  placeaddress: {
    fontSize: 9,
    fontWeight: "700",
    marginTop: 4,
    marginLeft: 7,
  },
  placeaddress2: {
    fontSize: 9,
    fontWeight: "700",
    marginTop: 11,
    marginLeft: 7,
  },
  Timing: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: 1,
    marginRight: 7,
  },

  place: {
    fontSize: 9,
    fontWeight: "700",
    marginTop: 10,
    marginLeft: 2,
  },

  drop: {
    fontSize: 10,

    fontWeight: "700",
    marginTop: 17,
    marginLeft: 2,
  },

  Drops: {
    marginTop: -5,

    marginLeft: 400,
  },
});
