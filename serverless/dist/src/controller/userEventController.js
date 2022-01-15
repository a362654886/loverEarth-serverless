"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryUserEvents = exports.updateUserEvent = exports.insertUserEvent = void 0;
const tables_1 = require("../types/tables");
const MongoDBService_1 = require("../DBservice/MongoDBService");
const insertUserEvent = async (userEventBody) => MongoDBService_1.dbServiceInsert(tables_1.Table.userEvent, userEventBody);
exports.insertUserEvent = insertUserEvent;
const updateUserEvent = async (userEvent) => {
    const filterObj = { userId: userEvent.userId, eventId: userEvent.eventId };
    const body = {
        $set: {
            userId: userEvent.userId,
            eventId: userEvent.eventId,
            hours: userEvent.hours,
        },
    };
    return MongoDBService_1.dbServiceUpdate(tables_1.Table.userEvent, filterObj, body);
};
exports.updateUserEvent = updateUserEvent;
const queryUserEvents = async (filter, page, pageSize) => MongoDBService_1.dbServiceQuery(tables_1.Table.userEvent, filter, page, pageSize, { _id: 1 });
exports.queryUserEvents = queryUserEvents;
