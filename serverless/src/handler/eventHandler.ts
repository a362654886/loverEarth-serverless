import { Handler } from "aws-lambda";
import {
  generateReturnBody,
  getResult,
} from "../helperFunctions/generateReturnBody";
import { InsertOneWriteOpResult } from "mongodb";
import { allTypes } from "../types/allTypes";
import {
  getEventsWithUsers,
  insertEvent,
  queryEvents,
} from "../controller/eventTypeController";
import { EventType } from "../types/event";

const eventInsert: Handler = async (event, context) => {
  const { eventBody } = JSON.parse(event.body) || {};
  return getResult<EventType, InsertOneWriteOpResult<allTypes>>(
    eventBody,
    insertEvent
  );
};

const eventsQuery: Handler = async (event, context) => {
  const { page, pageSize } = event.queryStringParameters;
  const result = await queryEvents({}, page, pageSize);
  return generateReturnBody(200, JSON.stringify(result));
};

const eventsQueryWithUser: Handler = async (event, context) => {
  const { eventId, page, pageSize } = event.queryStringParameters;
  const result = await getEventsWithUsers(
    { _id: eventId },
    { _id: 1 },
    page,
    pageSize
  );
  return generateReturnBody(200, JSON.stringify(result));
};

export { eventInsert, eventsQuery,eventsQueryWithUser };
