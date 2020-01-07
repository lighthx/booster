import { Permission } from "react-native-permissions/src/types";
import { Platform } from "react-native";
import { check, PERMISSIONS, request } from "react-native-permissions";
import analytics from "@react-native-firebase/analytics";

export const assertPermission = async ({
  ios,
  android,
  message
}: {
  ios: Permission;
  android: Permission;
  message: string;
}) => {
  const permission = Platform.select({
    ios,
    android
  });
  if (
    (await check(permission)) === "denied" &&
    (await request(permission)) === "denied"
  ) {
    analytics().logEvent("user_denied_permission", { permission });
    throw new Error(message);
  }
};
export const assertImagePermissions = async () => {
  await assertPermission({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
    message: "Need your camera access"
  });
  await assertPermission({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    message: "Need your photo library access"
  });
};