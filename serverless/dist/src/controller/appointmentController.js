"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAppointment = void 0;
const tables_1 = require("../types/tables");
const MongoDBService_1 = require("../DBservice/MongoDBService");
const insertAppointment = async (appointmentBody) => MongoDBService_1.dbServiceInsert(tables_1.Table.appointment, appointmentBody);
exports.insertAppointment = insertAppointment;
