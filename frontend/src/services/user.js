import * as Application from "expo-application";

import { Platform } from "react-native";

const isIOS = Platform.OS === "ios";

export const User = async () => {
  let uniqueId;
  if (isIOS) {
    let iosId = await Application.getIosIdForVendorAsync();
    uniqueId = iosId;
  } else {
    uniqueId = Application.androidId;
  }

  console.log(uniqueId);
};
