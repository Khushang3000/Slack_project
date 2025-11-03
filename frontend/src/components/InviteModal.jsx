import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import { XIcon } from "lucide-react";


const InviteModal = ({channel, onClose}) => {
    const {client} = useChatContext();

  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState("");
  const [isInviting, setIsInviting] = useState(false);



  //we could've done this with tanstack query. but to keep it simple we're using useEffect here.
  useEffect(() => {
    const fetchUsers = async ()=>{
        setIsLoadingUsers(true);
        setError(null)

        try {
            const members = Object.keys(channel.state.members)
            const response = await client.queryUsers({id: {$nin: members}}, {name: 1}, {limit: 30});

            setUsers(response.users)
        } catch (error) {
            console.log("Error fetching users",error)
            setError("Failed to load users.")
        } finally {
            setIsLoadingUsers(false)
        }
    }
  
  }, [channel, client])

  const handleInvite = async ()=>{
    if(selectedMembers.length <= 0) return;

    setIsInviting(true);
    setError(null);

    try {
        await channel.addMembers(selectedMembers)//add the selected members.
        onClose()//closing the model.
    } catch (error) {
        setError("Failed to invite users.")
        console.log("Error inviting users",error)

    } finally {
        setIsInviting(false);
    }
  }
  
  return (
    <div className="create-channel-modal-overlay">
        <div className="create-channel-modal">
            {/* Header of the invite modal. */}
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
            {users.length === 0 && !isLoadingUsers &&<p>No users Found...</p>}


            {users.length > 0 && users.map((user)=>{
                const checked = selectedMembers.includes(user.id)//if selected members include the user's id then that user is checked.
                return (
                    <label htmlFor="" key={user.id} className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all shadow-sm bg-white hover:bg-[#f5f3ff] border-2 ${
                    isChecked ? "border-[#611f69] bg-[#f3e6fa]" : "border-gray-200"
                  }`}>
                    {/* rest we'll do in the next commit */}

                  </label>
                )
            })}
        </div>
    </div>
  )
}

export default InviteModal