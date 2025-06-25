"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUser = getUser;
exports.addPromptSessions = addPromptSessions;
const dbClient_1 = require("./dbClient");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
async function createUser(user) {
    const command = new lib_dynamodb_1.PutCommand({
        TableName: dbClient_1.TABLE_NAME,
        Item: user,
    });
    await dbClient_1.dbClient.send(command);
    console.log("User created or replaced");
}
async function getUser(user_id) {
    const command = new lib_dynamodb_1.GetCommand({
        TableName: dbClient_1.TABLE_NAME,
        Key: { user_id },
    });
    const result = await dbClient_1.dbClient.send(command);
    return result.Item;
}
async function addPromptSessions(user_id, project_id, question, answer, txId) {
    const newSession = {
        session_id: (0, uuid_1.v4)(),
        timestamp: Date.now().toString(),
        question,
        answer,
        txId,
    };
    const result = await dbClient_1.dbClient.send(new lib_dynamodb_1.GetCommand({
        TableName: dbClient_1.TABLE_NAME,
        Key: { user_id },
    }));
    const user = result.Item;
    console.log("[user]", user);
    if (!user)
        throw new Error("User not found");
    const updatedProjects = (user.projects || []).map((project) => {
        if (project.id === project_id) {
            return {
                ...project,
                sessions: [...(project.sessions || []), newSession],
            };
        }
        return project;
    });
    console.log("[updatedProjects]", updatedProjects);
    try {
        await dbClient_1.dbClient.send(new lib_dynamodb_1.UpdateCommand({
            TableName: dbClient_1.TABLE_NAME,
            Key: { user_id },
            UpdateExpression: "SET projects = :projects",
            ExpressionAttributeValues: {
                ":projects": updatedProjects,
            },
        }));
    }
    catch (error) {
        console.log(error);
    }
    console.log(`Session added to project ${project_id} for user ${user_id}`);
}
async function main() {
    const res = await addPromptSessions("sptly-94033f21c2de4dafz", "65853e8b-784c-401e-bcaf-1725f9dd6e59", "What is your name?", "My name is Rakesh", "0xf91cea9be82d167a37840d44c08f12b4b8d0ce54621c8f9f8181dc1928b01006");
    console.log(res);
}
main();
