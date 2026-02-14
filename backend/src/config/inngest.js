import { Inngest } from "inngest";
import { User } from "../models/user.model.js";
import { addUserToPublicChannels, deleteStreamUser, upsertStreamUser } from "./stream.js";
import * as Sentry from '@sentry/node';

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event})=>{
        try {
            const {id, email_addresses, first_name, last_name, image_url} = event.data;

            if (!id || !email_addresses?.[0]?.email_address) {
                throw new Error("Invalid user data from Clerk webhook");
            }

            const newUser = {
                clerkId: id,
                email: email_addresses[0].email_address,
                name: `${first_name || ""} ${last_name || ""}`.trim(),
                image: image_url || ""
            };

            await User.create(newUser);
            console.log("User synced to database:", newUser.clerkId);

            await upsertStreamUser({
                id: newUser.clerkId.toString(),
                name: newUser.name,
                image: newUser.image
            })

            await addUserToPublicChannels(newUser.clerkId.toString())
        } catch (error) {
            console.error("Error syncing user from Clerk to database:", error.message);
            Sentry.captureException(error, {
                tags: { component: "inngest.syncUser" },
                extra: { context: "sync_user_from_clerk", clerkId: event.data?.id },
            });
            throw error;
        }
    }
)

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({event})=>{
       try {
           const {id} = event.data;
           
           if (!id) {
               throw new Error("Invalid user ID from Clerk webhook");
           }
           
           await User.deleteOne({clerkId: id});
           console.log("User deleted from database:", id);

           await deleteStreamUser(id.toString());
       } catch (error) {
           console.error("Error deleting user from database:", error.message);
           Sentry.captureException(error, {
               tags: { component: "inngest.deleteUserFromDB" },
               extra: { context: "delete_user_from_clerk", clerkId: event.data?.id },
           });
           throw error;
       }
    }
)

// Create an array of Inngest functions for event handling
export const functions = [syncUser, deleteUserFromDB];