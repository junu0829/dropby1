import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Audio } from "expo-av";
import { theme } from "../../../infrastructure/theme";
import { Text } from "../../../components/typography/text.component";
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { container, utils } from "./styles";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFlash, setIsFlash] = useState(false);

  const [type, setType] = useState(0);
  const [showGallery, setShowGallery] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryScrollRef, setGalleryScrollRef] = useState(null);
  const [galleryPickedImage, setGalleryPickedImage] = useState(null);
  const cameraRef = useRef();
  const isFocused = useIsFocused();

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////함수정의//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestPermissionsAsync();
      const galleryPermissions = await MediaLibrary.requestPermissionsAsync();

      const audioPermissions = await Audio.requestPermissionsAsync();

      if (
        cameraPermissions.status === "granted" &&
        audioPermissions.status === "granted" &&
        galleryPermissions.status === "granted"
      ) {
        const getPhotos = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["photo", "video"],
        });
        setGalleryItems(getPhotos);
        setGalleryPickedImage(getPhotos.assets[0]);
        setHasPermission(true);
      }
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;

      navigation.navigate({
        name: "WriteScreen",
        params: { source, imageSource: null, type },
        merge: true,
      });
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const handleGoToSaveOnGalleryPick = async () => {
    let type = galleryPickedImage.mediaType == "video" ? 0 : 1;

    const loadedAsset = await MediaLibrary.getAssetInfoAsync(
      galleryPickedImage
    );
    let imageSource = null;
    if (type == 0) {
      imageSource = await generateThumbnail(galleryPickedImage.uri);
    }

    navigation.navigate({
      name: "WriteScreen",
      params: {
        source: loadedAsset.localUri,
        type,
        imageSource,
      },
      merge: true,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////사진촬영하는 화면//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  const renderCaptureControl = () => (
    <View>
      <View
        style={{
          justifyContent: "space-evenly",
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          disabled={!isCameraReady}
          onPress={() => setIsFlash(!isFlash)}
        >
          <Feather
            style={utils.margin15}
            name={"zap"}
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
          <Feather
            style={utils.margin15}
            name="rotate-cw"
            size={25}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!isCameraReady}
          onPress={takePicture}
          style={styles.capturePicture}
        />

        <TouchableOpacity disabled={!isCameraReady}>
          <Feather
            style={utils.margin15}
            name={type == 0 ? "camera" : "video"}
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowGallery(true)}>
          <Feather
            style={utils.margin15}
            name={"image"}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////아래에 갤러리 보이는 화면//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  if (showGallery) {
    return (
      <ScrollView
        ref={(ref) => setGalleryScrollRef(ref)}
        style={[container.container, utils.backgroundWhite]}
      >
        <View style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: galleryPickedImage.uri }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}
            ratio={"1:1"}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 20,
            marginVertical: 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.bg.a,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginRight: 15,
              borderRadius: 50,
            }}
            onPress={() => {
              handleGoToSaveOnGalleryPick();
            }}
          >
            <Text variant="bold">선택</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.bg.a,
              borderRadius: 50,
            }}
            onPress={() => setShowGallery(false)}
          >
            <Feather
              style={{ padding: 10 }}
              name={"camera"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={({ flex: 1 }, [utils.borderTopGray])}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={galleryItems.assets}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[container.containerImage, utils.borderWhite]}
                onPress={() => {
                  galleryScrollRef.scrollTo({ x: 0, y: 0, animated: true });
                  setGalleryPickedImage(item);
                }}
              >
                <Image style={container.image} source={{ uri: item.uri }} />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////미리보기 화면//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
    >
      <View style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
        {isFocused ? (
          <Camera
            ref={cameraRef}
            style={{ flex: 1 }}
            type={cameraType}
            flashMode={
              isFlash
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}
            ratio={"1:1"}
            onCameraReady={onCameraReady}
          />
        ) : null}
      </View>

      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          },
        ]}
      >
        <View>{renderCaptureControl()}</View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#000000",
  },

  capture: {
    backgroundColor: "red",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    // eslint-disable-next-line no-dupe-keys
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  capturePicture: {
    borderWidth: 6,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    // eslint-disable-next-line no-dupe-keys
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
});
