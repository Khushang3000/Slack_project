import { HashIcon } from 'lucide-react';
import React from 'react'

const CustomChannelPreview = ({channel, activeChannel, setActiveChannel}) => {
    const isActive = activeChannel && activeChannel.id === channel.id;//if channel exists and if the channel's id is equal to current selected channel's id.
    const isDm = channel.data.member_count === 2 && channel.data.id.includes("user_");//if members in channel are 2, and the id starts with user_ then this is a direct message channel
    //go to clerk dashboard, users, view user's profile, there you'll see a userId field the id starts with user_ so with this we can understand if this is a dm or not.

    if(isDm){
        return null;
    }

    const unreadCount = channel.unreadCount;
  return (
    <button
      onClick={() => setActiveChannel(channel)}
      className={`str-chat__channel-preview-messenger transition-colors flex items-center w-full text-left px-4 py-2 rounded-lg mb-1 font-medium hover:bg-blue-50/80 min-h-9 ${
        isActive
          ? "!bg-black/20 !hover:bg-black/20 border-l-8 border-purple-500 shadow-lg text-blue-900"
          : ""
      }`}
    >
        <HashIcon className="w-4 h-4 text-[#9b9b9b] mr-2" />
      <span className="str-chat__channel-preview-messenger-name flex-1">{channel.data.id}</span>
      {unreadCount > 0 && (//if unreadCount > 0 only then we'll show it.
        <span className="flex items-center justify-center ml-2 size-4 text-xs rounded-full bg-red-500 ">
          {unreadCount}
        </span>
        
      )}

    </button>
  )
}

export default CustomChannelPreview