"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsWithUsers = exports.queryEvents = exports.insertEvent = void 0;
const tables_1 = require("../types/tables");
const MongoDBService_1 = require("../DBservice/MongoDBService");
const lookupBody_1 = require("../helperFunctions/lookupBody");
const insertEvent = async (eventBody) => MongoDBService_1.dbServiceInsert(tables_1.Table.event, eventBody);
exports.insertEvent = insertEvent;
const queryEvents = async (filter, page, pageSize) => MongoDBService_1.dbServiceLookup(tables_1.Table.event, lookupBody_1.getEventWithUsersLookUpBody(filter), page, pageSize, { _id: 1 });
exports.queryEvents = queryEvents;
//dbServiceQuery(Table.event, filter, page, pageSize, { _id: 1 });
const getEventsWithUsers = async (filterBody, sortBody, page, pageSize) => MongoDBService_1.dbServiceLookup(tables_1.Table.event, lookupBody_1.getEventWithUsersLookUpBody(filterBody), page, pageSize, sortBody);
exports.getEventsWithUsers = getEventsWithUsers;
