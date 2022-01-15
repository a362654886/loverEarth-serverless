import { InsertOneWriteOpResult, UpdateWriteOpResult } from "mongodb";
import { Table } from "../types/tables";
import {
  dbServiceInsert,
  dbServiceQuery,
  dbServiceUpdate,
} from "../DBservice/MongoDBService";
import { allTypes } from "../types/allTypes";
import { EventType, UserEventType } from "../types/event";

export const insertUserEvent = async (
  userEventBody: UserEventType
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<UserEventType>(Table.userEvent, userEventBody);

export const updateUserEvent = async (
  userEvent: UserEventType
): Promise<UpdateWriteOpResult> => {
  const filterObj = { userId: userEvent.userId, eventId: userEvent.eventId };
  const body = {
    $set: {
      userId: userEvent.userId,
      eventId: userEvent.eventId,
      hours: userEvent.hours,
    },
  };
  return dbServiceUpdate<Record<string, unknown>>(
    Table.userEvent,
    filterObj,
    body
  );
};

export const queryUserEvents = async (
  filter: Record<string, unknown>,
  page: number,
  pageSize: number
): Promise<EventType[] | null> =>
  dbServiceQuery(Table.userEvent, filter, page, pageSize, { _id: 1 });
