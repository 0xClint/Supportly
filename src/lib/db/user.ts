import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dbClient } from "./dynamoDBClient";
import { createHash } from "crypto";
import { Project, User } from "./db.types";


const USERS_TABLE = "agent-action-users";

export async function getUserByEmail(email: string) {
  const result = await dbClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { user_id: hashEmail(email) },
    })
  );
  return result.Item;
}

export async function createUser(user: {
  email: string;
  name: string;
  image_url: string;
}) {
  const item: User = {
    ...user,
    user_id: hashEmail(user.email),
    queries: 0,
    projects: [],
  };

  await dbClient.send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: item,
    })
  );

  return item;
}

export async function fetchProjects(email: string) {
  const result = await dbClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { user_id: hashEmail(email) },
    })
  );
  return result.Item;
}

export async function addProjectToUser(res: {
  user_id: string;
  name: string;
  logo_url: string;
  model: string;
  data_url: string;
  website_url: string;
  embedded_url: string;
  project_id: string;
}): Promise<void> {
  const result = await dbClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { user_id: res.user_id },
    })
  );

  const user = result.Item;
  if (!user) throw new Error("User not found");

  const {
    name,
    logo_url,
    model,
    data_url,
    website_url,
    project_id,
    embedded_url,
  } = res;

  const newProject: Project = {
    id: project_id,
    name,
    logo_url,
    model,
    data_url,
    website_url,
    embedded_url,
    sessions: [],
  };

  // Step 2: Append the project to existing projects
  const updatedProjects = [...(user.projects || []), newProject];

  // Step 3: Update the user
  await dbClient.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { user_id: res.user_id },
      UpdateExpression: "SET projects = :projects",
      ExpressionAttributeValues: {
        ":projects": updatedProjects,
      },
    })
  );

  console.log(`Project added for user ${res.user_id}`);
}

export function hashEmail(email: string): string {
  return `sptly-${createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 16)}z`;
}
