import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dbConnect from "../db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initUserBoard } from "../init-user-board";

const mongooseInstance = await dbConnect();
const client = mongooseInstance.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log("New user created:", user);
          if (user.id) {
            await initUserBoard(user.id);
          }
        }
      }
    }
  }
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers()
  });
  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers()
  });

  if (result.success) {
    redirect("/sign-in");
  }
}