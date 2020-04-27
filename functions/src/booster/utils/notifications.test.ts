import * as adminSDK from "../../adminsdk.json";
import * as admin from "firebase-admin";
import { sendNotificationsTo } from "./notifications";

beforeAll(() => {
  admin.initializeApp({
    credential: admin.credential.cert(adminSDK as any),
  });
});

test.only(
  "Send notification",
  async () => {
    await sendNotificationsTo("Du6bVNB7e9aoz8UKXk5cuYXYHen1", {
      title: "TEST",
      body: "Test Body",
    });
  },
  30 * 1000
);
