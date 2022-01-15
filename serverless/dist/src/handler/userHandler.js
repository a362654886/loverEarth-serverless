"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGetWithEvent = exports.userVolunteerUpdate = exports.userQuery = exports.userDelete = exports.userUpdate = exports.userInsert = exports.userGet = exports.userAuth = void 0;
const generateReturnBody_1 = require("../helperFunctions/generateReturnBody");
const userController_1 = require("../controller/userController");
const jwt_tools_1 = require("../jwt/jwt-tools");
const userAuth = async (event, context) => {
    const { userEmail, userPassword } = JSON.parse(event.body);
    const result = await userController_1.authUser(userEmail, userPassword);
    if (result == null) {
        return generateReturnBody_1.generateReturnBody(400, "please input right email and password");
    }
    else {
        const token = jwt_tools_1.jwtSign({
            userEmail,
            userPassword,
        });
        const returnBody = {
            user: result,
            token: token,
        };
        return generateReturnBody_1.generateReturnBody(200, JSON.stringify(returnBody));
    }
};
exports.userAuth = userAuth;
const userGet = async (event, context) => {
    const { userEmail } = event.queryStringParameters;
    const result = await userController_1.getUser({ userEmail: userEmail });
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.userGet = userGet;
const userQuery = async (event, context) => {
    const { firstName, lastName, volunteer, page, pageSize } = event.queryStringParameters;
    const firstNameRE = new RegExp(firstName);
    const lastNameRE = new RegExp(lastName);
    const filterObj = volunteer == "All"
        ? { firstName: firstNameRE, lastName: lastNameRE }
        : { firstName: firstNameRE, lastName: lastNameRE, volunteer: volunteer };
    const result = await userController_1.queryUser(filterObj, page, pageSize);
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.userQuery = userQuery;
const userGetWithEvent = async (event, context) => {
    const { userId, page, pageSize } = event.queryStringParameters;
    const filterObj = { _id: userId };
    const result = await userController_1.getUserWithEvent(filterObj, { _id: 1 }, page, pageSize);
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.userGetWithEvent = userGetWithEvent;
const userInsert = async (event, context) => {
    const { user } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(user, userController_1.insertUser);
};
exports.userInsert = userInsert;
const userUpdate = async (event, context) => {
    const { user } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(user, userController_1.updateUser);
};
exports.userUpdate = userUpdate;
const userVolunteerUpdate = async (event, context) => {
    const { email, volunteer } = JSON.parse(event.body) || {};
    const result = await userController_1.updateUserVolunteer(email, volunteer);
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.userVolunteerUpdate = userVolunteerUpdate;
const userDelete = async (event, context) => {
    const { userId } = JSON.parse(event.body);
    return generateReturnBody_1.getResult(userId, userController_1.deleteUser);
};
exports.userDelete = userDelete;
