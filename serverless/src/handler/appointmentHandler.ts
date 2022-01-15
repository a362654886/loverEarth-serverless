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
import { User } from "../types/userType";
import { allTypes } from "../types/allTypes";
import { insertAppointment } from "../controller/appointmentController";

const appointmentInsert: Handler = async (event, context) => {
  const { appointment } = JSON.parse(event.body) || {};
  return getResult<Appointment, InsertOneWriteOpResult<allTypes>>(appointment, insertAppointment);
};

export { appointmentInsert };