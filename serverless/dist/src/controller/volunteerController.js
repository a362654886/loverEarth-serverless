"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertVolunteer = void 0;
const tables_1 = require("../types/tables");
const MongoDBService_1 = require("../DBservice/MongoDBService");
const insertVolunteer = async (volunteerBody) => MongoDBService_1.dbServiceInsert(tables_1.Table.volunteer, volunteerBody);
exports.insertVolunteer = insertVolunteer;
