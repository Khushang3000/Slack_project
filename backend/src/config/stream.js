import {StreamChat} from 'stream-chat';
import { ENV } from './env.js';//make sure when you import some stuff from your local module, you add .js extention, and if you're importing from a installed module there you don't need to add that.

const streamClient = StreamChat.getInstance(ENV.STREAMAPIKEY,ENV.STREAMAPISECRET, )

export const upsertStreamUser = async (userData) => {//function that we'll run when we want to add user to stream.
    try {
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted successfully",userData.name);
        return userData
    } catch (error) {
        console.error("Error upserting the stream user", error)
    }
}

export const deleteStreamUser = async (userId) => {//function that we'll run when we want to delete user from stream.
    try {
        await streamClient.deleteUser(userId);
        console.log("Stream user deleted successfully");
    } catch (error) {
        console.error("Error deleting the stream user", error)
    }
}

//NOW YOU KNOW WHEN WILL THESE FUNCTIONS BE CALLED, that's right, inngest file. as soon as user is created-upsert, and as soon as user is deleted-delete.
//see it and come back, now to see this in action, we gotta redeploy our api but before that we will add a function down here, and that funciton is going to be for authentication.
//this auth is different from clerk authentication(clerkMiddleware), as this is stream authentication.
//stream creates a token to let you know that a user is authenticated. it'll make sense when we go into the frontend part.

export const generateStreamToken = (userId) => {
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString); 
    } catch (error) {
        console.error("Error creating token", error)
        return null;
    }
}//now go to server.js, and add stream's middleware for auth, right below api/inngest, chatRoutes come from route/chat.route.js



export const addUserToPublicChannels = async (newUserId) => {//adding the user to public channels.
  const publicChannels = await streamClient.queryChannels({ discoverable: true });

  for (const channel of publicChannels) {
    await channel.addMembers([newUserId]);
  }
};