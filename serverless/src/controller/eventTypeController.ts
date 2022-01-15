import { InsertOneWriteOpResult } from "mongodb";
import { Table } from "../types/tables";
import {
  dbServiceInsert,
  dbServiceLookup,
  dbServiceQuery,
} from "../DBservice/MongoDBService";
import { allTypes } from "../types/allTypes";
import { EventType } from "../types/event";
import { getEventWithUsersLookUpBody } from "../helperFunctions/lookupBody";

export const insertEvent = async (
  eventBody: EventType
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<EventType>(Table.event, eventBody);

export const queryEvents = async (
  filter: Record<string, unknown>,
  page: number,
  pageSize: number
): Promise<EventType[] | null> =>
  dbServiceLookup<EventType>(
    Table.event,
    getEventWithUsersLookUpBody(filter),
    page,
    pageSize,
    { _id: 1 }
  );

//dbServiceQuery(Table.event, filter, page, pageSize, { _id: 1 });

export const getEventsWithUsers = async (
  filterBody: Record<string, unknown> | null,
  sortBody: Record<string, unknown>,
  page: number,
  pageSize: number
): Promise<EventType[] | null> =>
  dbServiceLookup<EventType>(
    Table.event,
    getEventWithUsersLookUpBody(filterBody),
    page,
    pageSize,
    sortBody
  );
