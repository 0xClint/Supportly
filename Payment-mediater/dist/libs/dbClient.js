"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLE_NAME = exports.dbClient = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
dotenv_1.default.config();
const client = new client_dynamodb_1.DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
exports.dbClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
exports.TABLE_NAME = process.env.AWS_TABLE_NAME;
