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

export const insertVolunteer = async (
  volunteerBody: Volunteer
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<Volunteer>(Table.volunteer, volunteerBody);
