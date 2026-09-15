import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const requiredEnv = (...names: string[]) => {
  const value = names.map((name) => process.env[name]?.trim()).find(Boolean);
  if (!value) {
    throw new Error(`${names.join(" or ")} must be set`);
  }
  return value;
};

const secret = requiredEnv("AUTH_SECRET");
const githubClientId = requiredEnv("AUTH_GITHUB_ID");
const githubClientSecret = requiredEnv("AUTH_GITHUB_SECRET");
const googleClientId = requiredEnv("AUTH_GOOGLE_ID");
const googleClientSecret = requiredEnv("AUTH_GOOGLE_SECRET");

export const { handlers, signIn, signOut, auth } = NextAuth({
  //providers: [GitHub, Google],
  secret,
  providers: [
    GitHub({ clientId: githubClientId, clientSecret: githubClientSecret }),
    Google({ clientId: googleClientId, clientSecret: googleClientSecret }),
  ],
});
