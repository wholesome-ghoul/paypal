import { $Notification, $NotificationTypes } from "./types";

export const SERVER_URL = process.env.SERVER_URL;
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

export const NOTIFICATION: Record<$NotificationTypes, $Notification> = {
  RESPONSE_CRITICAL: {
    name: "response-critical-error",
    heading: "Something went wrong",
    content: "Please try again.",
    variant: "alert",
  },
  RESPONSE_INFO: {
    name: "response-info",
    variant: "info",
  },
  RESPONSE_SUCCESS: {
    name: "response-success",
    variant: "success",
    heading: "Success!",
  },
};
