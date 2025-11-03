import { HashIcon, LockIcon, UsersIcon, PinIcon, VideoIcon } from "lucide-react";
import { useChannelStateContext } from "stream-chat-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import MembersModal from "./MembersModal";
import PinnedMessagesModal from "./PinnedMessagesModal";
import InviteModal from "./InviteModal";



const CustomChannelHeader = () => {
  const {channel} = useChannelStateContext();
  const { user } = useUser();

  const memberCount = Object.keys(channel.state.members).length;

  const [showInvite, setShowInvite] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);

  const otherUser = Object.values(channel.state.members).find(//getting other user's info to display on the header, or if channel, then channel's info like name,profile img
    (member) => member.user.id !== user.id
  );

    const isDM = channel.data?.member_count === 2 && channel.data?.id.includes("user_");//if it consists of a user_, then it's a direct message.

  const handleShowPinned = async () => {
    const channelState = await channel.query();
    setPinnedMessages(channelState.pinned_messages);//setting all the pinned messages.

    setShowPinnedMessages(true)//so see a modal.

  }

  const handleVideoCall = async () => {
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`;//remember we have the call page under app.jsx.
      await channel.sendMessage({
        text: `I have started a video Call. Join me here: ${callUrl}`
      })
    }
  }


  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-4 justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {/* checking if a channel is private then show lock icon, if not then # icon. */}
          {channel.data?.private ? (
            <LockIcon className="size-4 text-[#616061]" />
          ) : (
            <HashIcon className="size-4 text-[#616061]" />
          )}
          {/* if this is a dm channel then show other user's dp */}
          {isDM && otherUser?.user?.image && (
            <img
              src={otherUser.user.image}
              alt={otherUser.user.name || otherUser.user.id}
              className="size-7 rounded-full object-cover mr-1"
            />
          )}
            {/* if it's direct message then put the user's name or id, if a channel then then channel.data.id. */}
           <span className="font-medium text-[#1D1C1D]">
            {isDM ? otherUser?.user?.name || otherUser?.user?.id : channel.data?.id}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* btn that shows members of the channel. */}
        <button
          className="flex items-center gap-2 hover:bg-[#F8F8F8] py-1 px-2 rounded"
          onClick={() => setShowMembers(true)}
        >
          <UsersIcon className="size-5 text-[#616061]" />
          <span className="text-sm text-[#616061]">{memberCount}</span>
        </button>

          {/* videoCall button */}
        <button
          className="hover:bg-[#F8F8F8] p-1 rounded"
          onClick={handleVideoCall}
          title="Start Video Call"
        >
          <VideoIcon className="size-5 text-[#1264A3]" />
        </button>

        {/* inviting other people to the channel button */}
        {channel.data?.private && (
          <button className="btn btn-primary" onClick={() => setShowInvite(true)}>
            Invite
          </button>
        )}

        {/* button that shows pinned messages */}
        <button className="hover:bg-[#F8F8F8] p-1 rounded" onClick={handleShowPinned}>
          <PinIcon className="size-4 text-[#616061]" />
        </button>

      </div>
      {/* if user clicked on the members icon, it set showMembers to true, and with that we'll show the members of the channel.
      see membersModal */}
      {showMembers && (
        <MembersModal
          members={Object.values(channel.state.members)}
          onClose={() => setShowMembers(false)}
        />
      )}

      {/* same for pinned messages */}
      {showPinnedMessages && (
        <PinnedMessagesModal
          pinnedMessages={pinnedMessages}
          onClose={() => setShowPinnedMessages(false)}
        />
      )}
      {/* adding invite functionality for private channels, we'll do this in the next commit. */}
      {showInvite && <InviteModal channel={channel} onClose={() => setShowInvite(false)} />}
    </div>
  )
}

export default CustomChannelHeader