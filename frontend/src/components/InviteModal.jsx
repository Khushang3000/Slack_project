import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import { XIcon } from "lucide-react";

const InviteModal = ({ channel, onClose }) => {
  const { client } = useChatContext();

  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState("");
  const [isInviting, setIsInviting] = useState(false);

  //we could've done this with tanstack query. but to keep it simple we're using useEffect here.
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      setError(null);

      try {
        const members = Object.keys(channel.state.members);
        const response = await client.queryUsers(
          { id: { $nin: members } },
          { name: 1 },
          { limit: 30 },
        );

        console.log(response.users)
        setUsers(response.users);
      } catch (error) {
        console.log("Error fetching users", error);
        setError("Failed to load users.");
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [channel, client]);

  const handleInvite = async () => {
    if (selectedMembers.length === 0) return;

    setIsInviting(true);
    setError(null);

    try {
      await channel.addMembers(selectedMembers); //add the selected members.
      onClose(); //closing the model.
    } catch (error) {
      setError("Failed to invite users.");
      console.log("Error inviting users", error);
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="create-channel-modal-overlay">
      <div className="create-channel-modal">
        {/* Header of the invite modal. */}
        <div className="create-channel-modal__header">
          <h2>Invite Users.</h2>
          <button onClick={onClose} className="create-channel-modal__close">
            <XIcon className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="create-channel-modal__form">
          {/* if loading users is true then show this., if error then show error in p tag. */}
          {isLoadingUsers && <p>Loading users...</p>}
          {error && <p className="form-error">{error}</p>}

          {/* && returns the last truthy value. */}
          {users.length === 0 && !isLoadingUsers && <p>No users Found...</p>}

          {users.length > 0 &&
            users.map((user) => {
              const isChecked = selectedMembers.includes(user.id); //if selected members include the user's id then that user is checked.
              return (
                <label
                  key={user.id}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all shadow-sm bg-white hover:bg-[#f5f3ff] border-2 ${
                    isChecked
                      ? "border-[#611f69] bg-[#f3e6fa]"
                      : "border-gray-200"
                  }`}
                >
                  {/* rest we'll do in the next commit */}

                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm accent-[#611f69]"
                    value={user.id}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedMembers([...selectedMembers, user.id]);
                      else
                        selectedMembers(
                          selectedMembers.filter((id) => id !== user.id),
                        );
                    }}
                  />

                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="size-9 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="size-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
                      {(user.name || user.id).charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="font-medium text-[#611f69] text-base">
                    {user.name || user.id}
                  </span>
                </label>
              );
            })}
          {/* Actions */}
          <div className="create-channel-modal__actions mt-4">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isInviting}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleInvite}
              disabled={!selectedMembers.length || isInviting}
            >
              {isInviting ? "Inviting..." : "Invite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// now this is done but one thing tho, inside createChannelModal we're using useEffect to reset the states, it's not needed, and still shi would work fine, as in the home page, 
// {isCreateModalOpen && ( //if createModal is open then render this component below.
        //   <CreateChannelModal onClose={() => setisCreateModalOpen(false)} />
        // )}
// this means that whenever isCreateModal is open the CreateChannelModal will rerender from the start, which means that all the fields would take their default values anyways.
// alright now the createChannelHeader is completed. now in next commit we'll work on adding the video calling functionality.
//so go to the callPage.jsx, so when user visits /call/:id then we call that callPage.jsx(see in app.jsx)
export default InviteModal;
