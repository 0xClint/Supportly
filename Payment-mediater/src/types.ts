export interface User {
  userid: string;
  address: string;
  name: string;
  quries: number;
}

export interface Session {
  session_id: string;
  timestamp: string;
  question: string;
  answer: string;
  txId: string;
}
