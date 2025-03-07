import { MongoClient } from "mongodb";
import { safeEnv } from "../utils/safeEnv";

const MONGO_URI = safeEnv("MONGO_URI");
const DB_NAME = process.env.DB_NAME || "otogakure";

let dbClient: MongoClient | null = null;

export const initDb = async () => {
  dbClient = await MongoClient.connect(MONGO_URI);
  return null;
};

export const db = () => {
  if (!dbClient) {
    throw Error("Mongo DB not connected wtf");
  }
  return dbClient.db(DB_NAME);
};
