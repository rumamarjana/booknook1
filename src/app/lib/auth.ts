import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient("process.env.MONGODB_URL");
const client = new MongoClient(process.env.MONGODB_URL!);
const db = client.db('booknook_db');

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://booknook-xbthci9d2-marjana.vercel.app",
  ],
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  }, 
  plugins: [jwt()], session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60 
    }
  }
});