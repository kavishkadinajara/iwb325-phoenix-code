/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import Asgardeo from "next-auth/providers/asgardeo";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Asgardeo({
      clientId: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      issuer: process.env.ASGARDEO_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, trigger }) {
      // console.log("jwt->token: ", token);
      // console.log("jwt->account: ", account);
      // console.log("jwt->profile: ", profile);
      // console.log("jwt->trigger: ", trigger);
      if (account?.providerAccountId) {
        token.id = account.providerAccountId;
      }
      if (profile?.given_name) {
        token.name = profile.given_name;
      }

      if (trigger === "signUp" && profile?.email) {
        //save to db
        const res = await fetch(`${process.env.NEXT_PUBLIC_BAL_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: token.id,
            name: token.name,
            email: profile?.email,
          }),
        });

        if (!res.ok) {
          throw new Error("Error saving user");
        }
      }

      return token;
    },
    async session({ session, token }) {
      const signingSecret = process.env.JWT_SECRET;
      // console.log("session->token:", token);
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.name) {
        session.user.name = token.name as string;
      }
      //console.log("session", session)
      if (signingSecret) {
        const payload = {
          iss: "eventure",
          aud: "authenticated",
          sub: session.user.id,
          email: session.user.email,
          role: "authenticated",
        };
        session.accessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
});
