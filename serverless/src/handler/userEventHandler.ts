import { Handler } from "aws-lambda";
import {
  generateReturnBody,
  getResult,
} from "../helperFunctions/generateReturnBody";
import { InsertOneWriteOpResult, UpdateWriteOpResult } from "mongodb";
import { allTypes } from "../types/allTypes";
import {
  insertUserEvent,
  queryUserEvents,
  updateUserEvent,
} from "../controller/userEventController";
import { UserEventType } from "../types/event";

const userEventInsert: Handler = async (event, context) => {
  const { eventBody } = JSON.parse(event.body) || {};
  return getResult<UserEventType, InsertOneWriteOpResult<allTypes>>(
    eventBody,
    insertUserEvent
  );
};

const userEventQuery: Handler = async (event, context) => {
  const { userId, page, pageSize } = event.queryStringParameters;
  const result = await queryUserEvents({ userId: userId }, page, pageSize);
  return generateReturnBody(200, JSON.stringify(result));
};

const userEventUpdate: Handler = async (event, context) => {
  const { userEvent } = JSON.parse(event.body) || {};
  return getResult<UserEventType, UpdateWriteOpResult>(
    userEvent,
    updateUserEvent
  );
};

export { userEventInsert, userEventQuery, userEventUpdate };
