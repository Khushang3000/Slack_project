import {StreamChat} from 'stream-chat';
import { ENV } from './env.js';
import * as Sentry from '@sentry/node';

if (!ENV.STREAMAPIKEY || !ENV.STREAMAPISECRET) {
    console.error("Stream API credentials are missing. Please set STREAM_API_KEY and STREAM_API_SECRET.");
    Sentry.captureMessage("Stream API credentials missing", "error");
}

const streamClient = StreamChat.getInstance(ENV.STREAMAPIKEY, ENV.STREAMAPISECRET);

export const upsertStreamUser = async (userData) => {
    try {
        if (!userData?.id) {
            throw new Error("User ID is required for stream upsert");
        }
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted successfully", userData.name);
        return userData;
    } catch (error) {
        console.error("Error upserting the stream user:", error.message);
        Sentry.captureException(error, {
            tags: { component: "stream.config" },
            extra: { context: "upsert_stream_user", userId: userData?.id },
        });
        throw error;
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required for stream deletion");
        }
        await streamClient.deleteUser(userId);
        console.log("Stream user deleted successfully");
    } catch (error) {
        console.error("Error deleting the stream user:", error.message);
        Sentry.captureException(error, {
            tags: { component: "stream.config" },
            extra: { context: "delete_stream_user", userId },
        });
        throw error;
    }
}

export const generateStreamToken = (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required to generate stream token");
        }
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.error("Error creating token:", error.message);
        Sentry.captureException(error, {
            tags: { component: "stream.config" },
            extra: { context: "generate_stream_token", userId },
        });
        return null;
    }
}

export const addUserToPublicChannels = async (newUserId) => {
  try {
    if (!newUserId) {
        throw new Error("User ID is required to add to public channels");
    }
    const publicChannels = await streamClient.queryChannels({ discoverable: true });

    for (const channel of publicChannels) {
      await channel.addMembers([newUserId]);
    }
  } catch (error) {
    console.error("Error adding user to public channels:", error.message);
    Sentry.captureException(error, {
        tags: { component: "stream.config" },
        extra: { context: "add_user_public_channels", userId: newUserId },
    });
    throw error;
  }
};