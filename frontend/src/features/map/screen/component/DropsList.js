// import React from "react";
// import MapView from "react-native-maps";
// import { ImageBackground, Text } from "react-native";
// import PurpleDrop from "../../../../../assets/images/PurpleDrop.png";

// export const DropsList = ({
//   drops = {},
//   showModal,
//   setWriteMode,
//   setPressedLocation,
//   setDropContent,
//   setDrop,
// }) => {
//   return drops.map((drop) => {
//     return (
//       <MapView.Marker
//         style={{ opacity: 0.85 }}
//         key={drop.pk}
//         coordinate={{
//           latitude: drop.latitude,
//           longitude: drop.longitude,
//         }}
//         onPress={() => {
//           showModal();
//           setWriteMode(false);
//           setPressedLocation({
//             latitude: drop.latitude,
//             longitude: drop.longitude,
//           });
//           setDropContent(drop.content);
//           setDrop(drop.pk);
//         }}
//       >
//         <ImageBackground
//           source={PurpleDrop}
//           style={{
//             width: 34,
//             height: 44,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 25,
//               left: 1,
//               top: 1,
//             }}
//           >
//             {drop.emoji}
//           </Text>
//         </ImageBackground>
//       </MapView.Marker>
//     );
//   });
// };
