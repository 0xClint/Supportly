import { PinataSDK, VectorizeQueryResponse, VectorQueryMatch } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiOTg2YjFkMC0xYjc5LTRlOGUtOWQ5Ni1lNzcwODQ5MzI2ZGIiLCJlbWFpbCI6Im9ta2FyX2JkQGN5LmlpdHIuYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTFmMTY4ZDVjMzhjZDRhYTEyNGIiLCJzY29wZWRLZXlTZWNyZXQiOiJlMzJjOTJjZjU0YzZiNzA5NGYwYzBjNmQ0ZWQ2NDljZDkxNjY5ODFlOGU2MzM0ZjJmNjBmZjBiMTE5MzVhNmVmIiwiZXhwIjoxNzgxNzY4NDA5fQ.d2tVKLU9IKXrhMbALo1PC8pEg4GyhYZ8kNAwQrgUl5o",
  pinataGateway: "gray-glad-coral-230.mypinata.cloud",
  pinataGatewayKey:
    "AV93b2_4_s78xxhbxv9FNMDMwjfAXbGk833bSguXe-uNVqOUWyQPxTJHwpX_flmY",
});

const GROUP_ID = "0197936b-7aab-75db-b6e0-5e03d9a0f58d";
export const fetchVector = async (projectId: "123") => {
  const { files } = await pinata.files.public.list().keyvalues({
    projectId,
  });
  const cid = files[0].cid;

  const { data, contentType } = await pinata.gateways.private.get(cid);
  return data;
};

// (async () => {
//   await fetchVector();
// })();

const updatKeyValue = async () => {
  const update = await pinata.files.private.update({
    id: "0197a424-e4dc-7563-b33b-26c4adbd895a", // Target File ID
    keyvalues: {
      projectId: "123",
    },
  });
};

// (async () => {
//   await updatKeyValue();
// })();
// export async function fetchVector(userQuery: string): Promise<Document[]> {
//   try {
//     const response: VectorizeQueryResponse =
//       await pinata.files.private.queryVectors({
//         groupId: GROUP_ID,
//         query: userQuery,
//         returnFile: true,
//       });

//     const documents: Document[] = [];

//     for (const match of response.matches) {
//       const { cid, score }: VectorQueryMatch = match;

//       const fileResult = await pinata.files.get({ cid });
//       const { data, contentType } = await pinata.gateways.private.get(cid);

//       const content: string =
//         contentType === "string" ? data : JSON.stringify(data);

//       documents.push(
//         new Document({
//           pageContent: JSON.stringify(data),
//           metadata: { cid, score },
//         })
//       );
//     }

//     return documents;
//   } catch (error) {
//     console.error("❌ Pinata vector fetch failed:", error);
//     return [];
//   }
// }
