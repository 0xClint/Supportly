import { Project, User } from "@/lib/db/db.types";
import { totalSessionsCount } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const UserDataProviderFn = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [sessionCnt, setSessionCnt] = useState<number>(1);
  const { status, data: session } = useSession();

  const fetchUserData = useCallback(async () => {
    const userEmail = session?.user.email;
    if (userEmail) {
      const response = await fetch("/api/user-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = (await response.json()) as { user: User; error: string };
      const user = data.user;
      if (response.ok) {
        setSessionCnt(totalSessionsCount(user));
        setUserId(user.user_id);
        setProjects(user.projects);
      } else {
        console.error("Error:", data.error);
      }
    }
  }, [session?.user.email]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, fetchUserData]);

  return { projects, userId, sessionCnt };
};

type UserContextProps = ReturnType<typeof UserDataProviderFn>;

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  children: ReactNode;
}
export const UserDataProvider = ({ children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={UserDataProviderFn()}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
