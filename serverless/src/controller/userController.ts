import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import { Table } from "../types/tables";
import { User } from "../types/userType";
import {
  dbServiceDelete,
  dbServiceGet,
  dbServiceInsert,
  dbServiceLookup,
  dbServiceQuery,
  dbServiceUpdate,
} from "../DBservice/MongoDBService";
import { allTypes } from "../types/allTypes";
import { getUsersWithEventsLookUpBody } from "../helperFunctions/lookupBody";

export const authUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const filterBody = {
    userEmail: email,
    password: password,
  };
  const users: User[] = await dbServiceGet<User>(Table.user, filterBody);
  return users.length != 0 ? users[0] : null;
};

export const getUser = async (
  filterBody: Record<string, unknown>
): Promise<User[] | null> => dbServiceGet<User>(Table.user, filterBody);

export const insertUser = async (
  userBody: User
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<User>(Table.user, userBody);

export const updateUser = async (
  userBody: User
): Promise<UpdateWriteOpResult> => {
  const filterObj = { userEmail: userBody.userEmail };
  const body = {
    $set: {
      userEmail: userBody.userEmail,
      password: userBody.password,
      firstName: userBody.firstName,
      lastName: userBody.lastName,
      address: userBody.address,
      gender: userBody.gender,
      brithday: userBody.birthday,
      admin: userBody.admin,
    },
  };
  return dbServiceUpdate<Record<string, unknown>>(Table.user, filterObj, body);
};

export const updateUserVolunteer = async (
  email: string,
  volunteer: string
): Promise<UpdateWriteOpResult> => {
  const filterObj = { userEmail: email };
  const body = {
    $set: {
      volunteer: volunteer,
    },
  };
  return dbServiceUpdate<Record<string, unknown>>(Table.user, filterObj, body);
};

export const deleteUser = async (
  userId: string
): Promise<DeleteWriteOpResultObject | null> => {
  const users: User[] | null = await getUser({
    userEmail: userId,
  });
  if (users) {
    return dbServiceDelete<User>("user", users[0]);
  } else {
    return null;
  }
};

export const queryUser = async (
  filter: Record<string, unknown>,
  page: number,
  pageSize: number
): Promise<User[] | null> =>
  dbServiceQuery(Table.user, filter, page, pageSize, { _id: 1 });

export const getUserWithEvent = async (
  filterBody: Record<string, unknown> | null,
  sortBody: Record<string, unknown>,
  page: number,
  pageSize: number
): Promise<User[] | null> =>
  dbServiceLookup<User>(
    Table.user,
    getUsersWithEventsLookUpBody(filterBody),
    page,
    pageSize,
    sortBody
  );

/*
    authorizer:
            name: authorizationFunc
            type: TOKEN
            identitySource: method.request.header.Authorization
            resultTtlInSeconds: 0   
    */
