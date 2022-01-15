import { Handler } from "aws-lambda";
import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import {
  generateReturnBody,
  getResult,
} from "../helperFunctions/generateReturnBody";
import { allTypes } from "../types/allTypes";
import { insertVolunteer } from "../controller/volunteerController";

const volunteerInsert: Handler = async (event, context) => {
  const { volunteer } = JSON.parse(event.body) || {};
  return getResult<Volunteer, InsertOneWriteOpResult<allTypes>>(volunteer, insertVolunteer);
};

export { volunteerInsert };