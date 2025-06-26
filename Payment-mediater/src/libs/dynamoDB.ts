import { dbClient, TABLE_NAME } from "./dbClient";
import { Session, User } from "../types";
import {
  GetCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

export async function createUser(user: User) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: user,
  });

  await dbClient.send(command);
  console.log("User created or replaced");
}

export async function getUser(user_id: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { user_id },
  });

  const result = await dbClient.send(command);
  return result.Item as User | undefined;
}

export async function addPromptSessions(
  user_id: string,
  project_id: string,
  question: string,
  answer: string,
  txId: string
): Promise<void> {
  const newSession: Session = {
    session_id: uuid(),
    timestamp: Date.now().toString(),
    question,
    answer,
    txId,
  };
  const result = await dbClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { user_id },
    })
  );

  const user = result.Item;
  // console.log("[user]", user);
  if (!user) throw new Error("User not found");

  const updatedProjects = (user.projects || []).map((project: any) => {
    if (project.id === project_id) {
      return {
        ...project,
        sessions: [...(project.sessions || []), newSession],
      };
    }
    return project;
  });
  // console.log("[updatedProjects]", updatedProjects);

  try {
    await dbClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { user_id },
        UpdateExpression: "SET projects = :projects",
        ExpressionAttributeValues: {
          ":projects": updatedProjects,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }

  console.log(`Session added to project ${project_id} for user ${user_id}`);
}

// async function main() {
//   const res = await addPromptSessions(
//     "sptly-94033f21c2de4dafz",
//     "65853e8b-784c-401e-bcaf-1725f9dd6e59",
//     "What is your name?",
//     "My name is Rakesh",
//     "0xf91cea9be82d167a37840d44c08f12b4b8d0ce54621c8f9f8181dc1928b01006"
//   );
//   console.log(res);
// }

// main();
