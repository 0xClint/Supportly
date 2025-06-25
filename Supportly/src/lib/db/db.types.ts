export interface Session {
  session_id: string;
  timestamp: string;
  question: string;
  answer: string;
  txId: string;
}
export interface Project {
  id: string;
  name: string;
  logo_url: string;
  model: string;
  data_url: string;
  website_url: string;
  embedded_url: string;
  sessions: Session[];
}

export interface User {
  user_id: string;
  email: string;
  name: string;
  image_url: string;
  queries: number;
  projects: Project[];
}
