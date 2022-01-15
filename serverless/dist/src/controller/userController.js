"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithEvent = exports.queryUser = exports.deleteUser = exports.updateUserVolunteer = exports.updateUser = exports.insertUser = exports.getUser = exports.authUser = void 0;
const tables_1 = require("../types/tables");
const MongoDBService_1 = require("../DBservice/MongoDBService");
const lookupBody_1 = require("../helperFunctions/lookupBody");
const authUser = async (email, password) => {
    const filterBody = {
        userEmail: email,
        password: password,
    };
    const users = await MongoDBService_1.dbServiceGet(tables_1.Table.user, filterBody);
    return users.length != 0 ? users[0] : null;
};
exports.authUser = authUser;
const getUser = async (filterBody) => MongoDBService_1.dbServiceGet(tables_1.Table.user, filterBody);
exports.getUser = getUser;
const insertUser = async (userBody) => MongoDBService_1.dbServiceInsert(tables_1.Table.user, userBody);
exports.insertUser = insertUser;
const updateUser = async (userBody) => {
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
    return MongoDBService_1.dbServiceUpdate(tables_1.Table.user, filterObj, body);
};
exports.updateUser = updateUser;
const updateUserVolunteer = async (email, volunteer) => {
    const filterObj = { userEmail: email };
    const body = {
        $set: {
            volunteer: volunteer,
        },
    };
    return MongoDBService_1.dbServiceUpdate(tables_1.Table.user, filterObj, body);
};
exports.updateUserVolunteer = updateUserVolunteer;
const deleteUser = async (userId) => {
    const users = await exports.getUser({
        userEmail: userId,
    });
    if (users) {
        return MongoDBService_1.dbServiceDelete("user", users[0]);
    }
    else {
        return null;
    }
};
exports.deleteUser = deleteUser;
const queryUser = async (filter, page, pageSize) => MongoDBService_1.dbServiceQuery(tables_1.Table.user, filter, page, pageSize, { _id: 1 });
exports.queryUser = queryUser;
const getUserWithEvent = async (filterBody, sortBody, page, pageSize) => MongoDBService_1.dbServiceLookup(tables_1.Table.user, lookupBody_1.getUsersWithEventsLookUpBody(filterBody), page, pageSize, sortBody);
exports.getUserWithEvent = getUserWithEvent;
/*
    authorizer:
            name: authorizationFunc
            type: TOKEN
            identitySource: method.request.header.Authorization
            resultTtlInSeconds: 0
    */
