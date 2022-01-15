import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import { Table } from "../types/tables";
import {
  dbServiceDelete,
  dbServiceGet,
  dbServiceInsert,
  dbServiceQuery,
  dbServiceUpdate,
} from "../DBservice/MongoDBService";
import { allTypes } from "../types/allTypes";

export const insertAppointment = async (
  appointmentBody: Appointment
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<Appointment>(Table.appointment, appointmentBody);
