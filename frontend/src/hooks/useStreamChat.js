// since this is a custom hook, it has to start with the keyword use.
//also before doing this, in our app component, the signedIn and signedOut components are making the app a bit slow.
// so we gotta just find another way. see app.jsx and come back
// also now we gotta install tailwindcss. now after that in homepage, check if tailwind is working, now create api.js in lib folder.

import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import * as Sentry from "@sentry/react";

// add streamapikey in the env.local.
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// this custom hook is used to connect the current user to the streamChatApi,
// so that users can see each other's messages, send each other messages, get realTime updates,etc.
// it also handles the disconnection when user leaves the page.

export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);

  //fetch stream token using tanstack react-query.
  const {
    data: tokenData,
    isLoading: tokenLoading,
    error: tokenError,
  } = useQuery({
    //renaming data to tokenData, isLoading to tokenLoading and similarly error
    queryKey: ["streamToken"], //we can name it anything
    queryFn: getStreamToken, //we know that query is just a get request so our function is just going to be a get function
    enabled: !!user.id, //this will take the object and convert it to a boolean value.
    // we did this because we only want this query to run when the user is authenticated.
  });

  // initialize stream-chat-client
  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !user) {
        // if there's no token or user
        return;
      }
      //if we have them then we run a try and catch block.
      try {
        // now we create a client first, a client allows us to communicate with stream.
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: user.id,
            name: user.fullName,
            image: user.imageUrl,
          },
          tokenData.token,
        );
        setChatClient(client);
      } catch (error) {
        console.log("Error connecting to stream", error);
        Sentry.captureException(error, {
          tags: { component: "useStreamChat" },
          extra: {
            context: "stream_chat_connection",
            userId: user.id,
            streamApiKey: STREAM_API_KEY ? "present" : "missing",
          },
        });
      }
    };
    initChat();

    //   cleanup
    return () => {
      // this means when the tab was closed, so when the app is closed, it means that user is offline, and that's why we're using this disconnectUser.
      if (chatClient) chatClient.disconnectUser();
    };
  }, [tokenData, user, chatClient]); //run it whenever tokenData or user changes.

  return { chatClient, tokenLoading, tokenError }; //now we'll be using these fields in ui, later.
  // now in next commit we'll work on the homepage ui.
  // so go there.
};
