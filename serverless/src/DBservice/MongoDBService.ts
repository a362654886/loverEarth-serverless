import {
  AggregationCursor,
  Collection,
  DeleteWriteOpResultObject,
  GridFSBucket,
  InsertOneWriteOpResult,
  MongoClient,
  SortOptionObject,
  UpdateWriteOpResult,
} from "mongodb";
import { allTypes } from "../types/allTypes";

const dbConnectionUrl =
  "mongodb+srv://leilu:AAaa123581321@cluster0.myppd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let index: Record<string, unknown> = {};

//1. initial function return promise
//2. map

const dbObject = async (dbCollectionName: string): Promise<Collection> => {
  const dbInstance = await MongoClient.connect(dbConnectionUrl);
  const dbObject = dbInstance.db("loveEarth");
  const dbCollection = dbObject.collection(dbCollectionName);
  return dbCollection;
};

//query
const dbServiceGetAll = async <T>(
  tableName: string,
  searchKey: Record<string, unknown>,
  page: number,
  pageSize: number,
  sort: string | [string, number][] | SortOptionObject<any>
): Promise<T[]> => {
  const result = await dbObject(tableName);
  return result
    .find(searchKey)
    .sort(sort)
    .skip(pageSize * (page - 1))
    .limit(pageSize * 1)
    .toArray();
};

const dbServiceGet = async <T>(
  tableName: string,
  searchKey: Record<string, unknown>
): Promise<T[]> => {
  const result = await dbObject(tableName);
  return result.find(searchKey).toArray();
};

const dbServiceInsert = async <T>(
  tableName: string,
  body: T
): Promise<InsertOneWriteOpResult<allTypes>> => {
  const result = await dbObject(tableName);
  return result.insertOne(body);
};

const dbServiceUpdate = async <T>(
  tableName: string,
  filter: Record<string, unknown>,
  body: T
): Promise<UpdateWriteOpResult> => {
  const result = await dbObject(tableName);
  return result.updateOne(filter, body);
};

const dbServiceDelete = async <T>(
  tableName: string,
  body: T
): Promise<DeleteWriteOpResultObject> => {
  const result = await dbObject(tableName);
  return result.deleteOne(body);
};

const dbServiceQuery = async <T>(
  tableName: string,
  queryValue: Record<string, unknown>,
  page: number,
  pageSize: number,
  sort: any
): Promise<T[]> => {
  const result = await dbObject(tableName);
  return result
    .find(queryValue)
    .sort(sort)
    .skip(pageSize * (page - 1))
    .limit(pageSize * 1)
    .toArray();
};

const dbServiceCount = async (
  tableName: string,
  searchKey: Record<string, unknown>
): Promise<number> => {
  const result = await dbObject(tableName);
  return result.count(searchKey);
};

const dbServiceLookup = async <T>(
  tableName: string,
  lookupObj: any[],
  page: number,
  pageSize: number,
  sort: Record<string, unknown>
): Promise<T[]> => {
  const collection = await dbObject(tableName);
  return collection
    .aggregate(lookupObj)
    .sort(sort)
    .skip(pageSize * (page - 1))
    .limit(pageSize * 1)
    .toArray();
};

export {
  dbServiceGet,
  dbServiceInsert,
  dbServiceUpdate,
  dbServiceDelete,
  dbServiceQuery,
  dbServiceGetAll,
  dbServiceCount,
  dbServiceLookup
};
