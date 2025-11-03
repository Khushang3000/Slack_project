import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { useChatContext } from "stream-chat-react";

import * as Sentry from "@sentry/react";
import { CircleIcon } from "lucide-react";

const UsersList = ({ activeChannel }) => {
  const { client } = useChatContext();
  const [_, setSearchParams] = useSearchParams();

  const fetchUsers = useCallback(async () => {
    //we're using useCallback for performance reasons.
    if (!client?.user) {
      return;
    }
    const response = await client.queryUsers(
      { id: { $ne: client.user.id } },
      { name: 1 },
      { limit: 20 },
    );

    const usersOnly = response.users.filter(
      (user) => !user.id.startsWith("recording-"),
    );

    return usersOnly;
  }, [client]);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    //rename the data to users and by default it can be an empty array.
    queryKey: ["users-list", client?.user?.id],
    queryFn: fetchUsers,
    enabled: !!client?.user, //we don't wanna run the fetchUsers always, only run it when the client has user.
    staleTime: 1000 * 60 * 5, // 5 mins
  });
  // staleTime
  // what it does: tells React Query the data is "fresh" for 5 minutes
  // behavior: during these 5 minutes, React Query WON'T refetch the data automatically

  const startDirectMessage = async (targetUser) => {
    //this function will be called when the user clicks on any direct message.
    if (!targetUser || !client.user) return;

    try {
      // let's say there are 2 users who wanna chat, now 1userId is 12, and 2nduserId is 34, so then
      // the chat id will look like 12-34, (from user1's perspective), and 34-12 from user2's perspective, so then we just wanna sort it everytime
      //so the chat id looks like 12-34.
      const channelId = [client.user.id, targetUser.id]
        .sort()
        .join("-")
        .slice(0, 64); //at max it can be 64 characters. cuz stream doesn't allow channel id to be more than 64 characters.
      const channel = client.channel("messaging", channelId, {
        members: [client.user.id, targetUser.id],
      });
      await channel.watch();
      //listen for live events.
      setSearchParams({ channel: channel.id }); //immediately updating the url as soon as we hit the chat.
    } catch (error) {
      console.log("Error creating DM", error);
      Sentry.captureException(error, {
        tags: { component: "UsersList" },
        extra: {
          context: "create_direct_message",
          targetUserId: targetUser?.id,
        },
      });
    }
  };

  if (isLoading)
    return <div className="team-channel-list__message">Loading users...</div>;
  if (isError)
    return (
      <div className="team-channel-list__message">Failed to load users</div>
    );
  if (!users.length)
    return (
      <div className="team-channel-list__message">No other users found</div>
    );

  return (
    <div className="team-channel-list__users">
      {users.map((user) => {
        const channelId = [client.user.id, user.id]
          .sort()
          .join("-")
          .slice(0, 64);
        const channel = client.channel("messaging", channelId, {
          members: [client.user.id, user.id],
        });
        const unreadCount = channel.countUnread();
        const isActive = activeChannel && activeChannel.id === channelId; //if this chat is active then we'll just make some ui changes.

        return (
          <button
            key={user.id}
            onClick={() => startDirectMessage(user)} //on clicking this button, just start the direct messaging.
            className={`str-chat__channel-preview-messenger  ${
              isActive &&
              "!bg-black/20 !hover:bg-black/20 border-l-8 border-purple-500 shadow-lg0"
            }`}
          >
            <div className="flex items-center gap-2 w-full">
              <div className="relative">
                {user.image ? ( //if user has an image then show this image.
                  <img
                    src={user.image}
                    alt={user.name || user.id}
                    className="w-4 h-4 rounded-full"
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-xs text-white">
                      {/* otherwise put their first character and uppercase it. */}
                      {(user.name || user.id).charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <CircleIcon //if user is online or offline.
                  className={`w-2 h-2 absolute -bottom-0.5 -right-0.5 ${
                    user.online
                      ? "text-green-500 fill-green-500"
                      : "text-gray-400 fill-gray-400"
                  }`}
                />
              </div>
              <span className="str-chat__channel-preview-messenger-name truncate">
                {user.name || user.id}
              </span>

              {unreadCount > 0 && (
                <span className="flex items-center justify-center ml-2 size-4 text-xs rounded-full bg-red-500 ">
                  {unreadCount}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
// rn our app is working but, there's a problem, the public channels aren't visible to users, to fix that we can go to backend/inngest.js and add
//and addusertopublic channels. that's why we used The discoverable field while creating the channel.
//now in next commit we'll work on channel header setup. before that we fixed the homepage, where we were giving filters and preview the wrong way.
// oh and btw the previous stream chat sdk's allowed us to select what we wanna send, like file/poll/location but now it's changed, it only allows us to upload files, there's no option for poll or anything.
// to make them available, go to stream dashboard, channel types/messaging, you can enable polls and location sharing from there.
//also when the channel has some new/unread messages then the notification icon doesn't pop up on that channel, we fix that first.
// in customChannelPreview, instead of channel.unreadCount do channel.countUnread()
// now all functionalities are working and in next commit we'll work on channel header
//customChannelHeader.jsx
export default UsersList;
