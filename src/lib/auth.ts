import { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUserByEmail } from "./db/user";

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
  }
}

const providers = [];
if (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  providers.push(
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    })
  );

export const authOptions: AuthOptions = {
  providers,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account) return false;

      try {
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          await createUser({
            user_id: user.email,
            name: user.name || "",
            image_url:
              user.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          });
        }
        return true;
      } catch (err) {
        console.error("Error in signIn callback:", err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};
