import { User } from "./userType";

export type EventType = {
  _id: string;
  name: string;
  time: Date;
  introduction: string;
  hours?: number[];
  users?: User[];
};

export type UserEventType = {
  _id: string;
  userId: string;
  eventId: string;
  hours: number;
};
