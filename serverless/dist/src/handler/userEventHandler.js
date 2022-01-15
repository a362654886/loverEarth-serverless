"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEventUpdate = exports.userEventQuery = exports.userEventInsert = void 0;
const generateReturnBody_1 = require("../helperFunctions/generateReturnBody");
const userEventController_1 = require("../controller/userEventController");
const userEventInsert = async (event, context) => {
    const { eventBody } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(eventBody, userEventController_1.insertUserEvent);
};
exports.userEventInsert = userEventInsert;
const userEventQuery = async (event, context) => {
    const { userId, page, pageSize } = event.queryStringParameters;
    const result = await userEventController_1.queryUserEvents({ userId: userId }, page, pageSize);
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.userEventQuery = userEventQuery;
const userEventUpdate = async (event, context) => {
    const { userEvent } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(userEvent, userEventController_1.updateUserEvent);
};
exports.userEventUpdate = userEventUpdate;
