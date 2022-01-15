"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsQueryWithUser = exports.eventsQuery = exports.eventInsert = void 0;
const generateReturnBody_1 = require("../helperFunctions/generateReturnBody");
const eventTypeController_1 = require("../controller/eventTypeController");
const eventInsert = async (event, context) => {
    const { eventBody } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(eventBody, eventTypeController_1.insertEvent);
};
exports.eventInsert = eventInsert;
const eventsQuery = async (event, context) => {
    const { page, pageSize } = event.queryStringParameters;
    const result = await eventTypeController_1.queryEvents({}, page, pageSize);
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.eventsQuery = eventsQuery;
const eventsQueryWithUser = async (event, context) => {
    const { eventId, page, pageSize } = event.queryStringParameters;
    const result = await eventTypeController_1.getEventsWithUsers({ _id: eventId }, { _id: 1 }, page, pageSize);
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.eventsQueryWithUser = eventsQueryWithUser;
