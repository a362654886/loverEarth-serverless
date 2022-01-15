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
import {
  authUser,
  deleteUser,
  insertUser,
  getUser,
  updateUser,
  queryUser,
  updateUserVolunteer,
  getUserWithEvent,
} from "../controller/userController";
import { jwtSign } from "../jwt/jwt-tools";
import { allTypes } from "../types/allTypes";

const userAuth: Handler = async (event, context) => {
  const { userEmail, userPassword } = JSON.parse(event.body);
  const result: User | null = await authUser(userEmail, userPassword);
  if (result == null) {
    return generateReturnBody(400, "please input right email and password");
  } else {
    const token = jwtSign({
      userEmail,
      userPassword,
    });
    const returnBody = {
      user: result,
      token: token,
    };
    return generateReturnBody(200, JSON.stringify(returnBody));
  }
};

const userGet: Handler = async (event, context) => {
  const { userEmail } = event.queryStringParameters;
  const result = await getUser({ userEmail: userEmail });
  return generateReturnBody(200, JSON.stringify(result));
};

const userQuery: Handler = async (event, context) => {
  const { firstName, lastName, volunteer, page, pageSize } =
    event.queryStringParameters;
  const firstNameRE = new RegExp(firstName);
  const lastNameRE = new RegExp(lastName);
  const filterObj =
    volunteer == "All"
      ? { firstName: firstNameRE, lastName: lastNameRE }
      : { firstName: firstNameRE, lastName: lastNameRE, volunteer: volunteer };
  const result = await queryUser(filterObj, page, pageSize);
  return generateReturnBody(200, JSON.stringify(result));
};

const userGetWithEvent: Handler = async (event, context) => {
  const { userId, page, pageSize } = event.queryStringParameters;
  const filterObj = { _id: userId };
  const result = await getUserWithEvent(filterObj, { _id: 1 }, page, pageSize);
  return generateReturnBody(200, JSON.stringify(result));
};

const userInsert: Handler = async (event, context) => {
  const { user } = JSON.parse(event.body) || {};
  return getResult<User, InsertOneWriteOpResult<allTypes>>(user, insertUser);
};

const userUpdate: Handler = async (event, context) => {
  const { user } = JSON.parse(event.body) || {};
  return getResult<User, UpdateWriteOpResult>(user, updateUser);
};

const userVolunteerUpdate: Handler = async (event, context) => {
  const { email, volunteer } = JSON.parse(event.body) || {};
  const result = await updateUserVolunteer(email, volunteer);
  return generateReturnBody(200, JSON.stringify(result));
};

const userDelete: Handler = async (event, context) => {
  const { userId } = JSON.parse(event.body);
  return getResult<string, DeleteWriteOpResultObject | null>(
    userId,
    deleteUser
  );
};

export {
  userAuth,
  userGet,
  userInsert,
  userUpdate,
  userDelete,
  userQuery,
  userVolunteerUpdate,
  userGetWithEvent
};
