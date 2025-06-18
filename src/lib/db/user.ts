import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dbClient } from "./dynamoDBClient";
import { createHash } from "crypto";

const USERS_TABLE = "agent-action-users";

export async function getUserByEmail(email: string) {
  const result = await dbClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { user_id: email },
    })
  );
  return result.Item;
}

export async function createUser(user: {
  user_id: string;
  name: string;
  image_url: string;
}) {
  const item = {
    ...user,
    queries: 0,
  };

  await dbClient.send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: item,
    })
  );

  return item;
}

export function hashEmail(email: string): string {
  return `sptly-${createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 16)}z`;
}
