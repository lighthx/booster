import analytics from "@react-native-firebase/analytics";
import storage from "@react-native-firebase/storage";
import { currentUserId } from "../user";
import { v4 as uuid } from "uuid";
import { logError } from "../utils";

export const uploadFile = async (
  filePath: string,
  contentType: string = "image/png"
) => {
  analytics().logEvent("upload_file", { path: filePath, type: contentType });
  const ref = storage().ref(`users/${currentUserId()}/${uuid()}`);
  const snapshot = await ref.putFile(filePath, {
    cacheControl: "max-age=31536000",
    contentType,
  });
  if (snapshot.state !== "success" && snapshot.error != null) {
    analytics().logEvent("upload_file_failed", {
      path: filePath,
      type: contentType,
    });
    logError(snapshot.error as any);
    throw new Error("Unable to get download link");
  }
  analytics().logEvent("upload_file_succeed", {
    path: filePath,
    type: contentType,
  });
  return await ref.getDownloadURL();
};
