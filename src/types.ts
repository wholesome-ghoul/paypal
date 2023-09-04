import type {NotificationProps} from "@allaround/all-components/dist/types";

export type $NotificationTypes = "RESPONSE_CRITICAL" | "RESPONSE_INFO" | "RESPONSE_SUCCESS"

export type $Notification = 
  Pick<NotificationProps, "variant" | "heading" | "content"> & {
  name: string;
}
