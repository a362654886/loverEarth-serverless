import { EventType, UserEventType } from "./event";
import { User } from "./userType";

export type allTypes =
  | User
  | Volunteer
  | Appointment
  | EventType
  | UserEventType
