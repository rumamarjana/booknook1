



import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://booknook-theta-eight.vercel.app",

  fetchOptions: {
    credentials: "include",
  },

  plugins: [jwtClient()],
});

export const { signIn, signUp, useSession } = authClient;