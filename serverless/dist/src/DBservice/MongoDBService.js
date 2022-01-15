"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceLookup = exports.dbServiceCount = exports.dbServiceGetAll = exports.dbServiceQuery = exports.dbServiceDelete = exports.dbServiceUpdate = exports.dbServiceInsert = exports.dbServiceGet = void 0;
const mongodb_1 = require("mongodb");
const dbConnectionUrl = "mongodb+srv://leilu:AAaa123581321@cluster0.myppd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let index = {};
//1. initial function return promise
//2. map
const dbObject = async (dbCollectionName) => {
    const dbInstance = await mongodb_1.MongoClient.connect(dbConnectionUrl);
    const dbObject = dbInstance.db("loveEarth");
    const dbCollection = dbObject.collection(dbCollectionName);
    return dbCollection;
};
//query
const dbServiceGetAll = async (tableName, searchKey, page, pageSize, sort) => {
    const result = await dbObject(tableName);
    return result
        .find(searchKey)
        .sort(sort)
        .skip(pageSize * (page - 1))
        .limit(pageSize * 1)
        .toArray();
};
exports.dbServiceGetAll = dbServiceGetAll;
const dbServiceGet = async (tableName, searchKey) => {
    const result = await dbObject(tableName);
    return result.find(searchKey).toArray();
};
exports.dbServiceGet = dbServiceGet;
const dbServiceInsert = async (tableName, body) => {
    const result = await dbObject(tableName);
    return result.insertOne(body);
};
exports.dbServiceInsert = dbServiceInsert;
const dbServiceUpdate = async (tableName, filter, body) => {
    const result = await dbObject(tableName);
    return result.updateOne(filter, body);
};
exports.dbServiceUpdate = dbServiceUpdate;
const dbServiceDelete = async (tableName, body) => {
    const result = await dbObject(tableName);
    return result.deleteOne(body);
};
exports.dbServiceDelete = dbServiceDelete;
const dbServiceQuery = async (tableName, queryValue, page, pageSize, sort) => {
    const result = await dbObject(tableName);
    return result
        .find(queryValue)
        .sort(sort)
        .skip(pageSize * (page - 1))
        .limit(pageSize * 1)
        .toArray();
};
exports.dbServiceQuery = dbServiceQuery;
const dbServiceCount = async (tableName, searchKey) => {
    const result = await dbObject(tableName);
    return result.count(searchKey);
};
exports.dbServiceCount = dbServiceCount;
const dbServiceLookup = async (tableName, lookupObj, page, pageSize, sort) => {
    const collection = await dbObject(tableName);
    return collection
        .aggregate(lookupObj)
        .sort(sort)
        .skip(pageSize * (page - 1))
        .limit(pageSize * 1)
        .toArray();
};
exports.dbServiceLookup = dbServiceLookup;
