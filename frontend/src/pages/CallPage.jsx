import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

import { getStreamToken } from "../lib/api";

// npm i @stream-io/video-react-sdk
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";//styles file

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  //rn we're calling the url like /call/:id, if it were /call/:hello, then we'd have to make const {hello} variable below. as this id is what we're recieving through params
  const {id:callId} = useParams();
  const {user, isLoaded} = useUser();


  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const {data: tokenData} = useQuery({//renaming to tokenData
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    // only run the function if the user exists or not, since it takes a bookean value so we gotta use !! 
    enabled: !!user
  })

  useEffect(()=>{
    const initCall = async ()=>{
      if(!tokenData.token || !user || !callId) return;
      
      try {
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: {
            id: user.id,
            name: user.fullName,
            image: user.imageUrl
          },
          // passing token so that stream knows that we're authenticated.
          token: tokenData.token
        })

        const callInstance = videoClient.call("default",callId)
        callInstance.join({create: true})//if we pass true, it means that if the call doesn't exist then it'll be created.

        setClient(videoClient)
        setCall(callInstance)
      } catch (error) {
          console.log("Error init call", error)
          toast.error("Cannot connect to the call.")
      } finally {
        setIsConnecting(false)
      }
    }
    initCall()
  },[tokenData, user, callId])

  if(isConnecting || !isLoaded) return <div className="h-screen flex justify-center items-center">Connecting to the Call...</div>
  return (<div className="h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="relative w-full max-w-4xl mx-auto">
      {client && call ? (
        // by passing client now it knows what stream project are we on.
        <StreamVideo client={client}>
          {/* and here it knows what call are we on. */}
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>
            Could not initialize call, please refresh or try again later...
          </p>
        </div>
      )}
    </div>
  </div>);
};


const CallContent = ()=>{
  const {useCallCallingState}= useCallStateHooks();//this gives you multiple hooks.
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if(callingState === CallingState.LEFT) return navigate("/")//return nothing but navigate the user to the homepage.

  // just like the poll thingy while adding files, you can also enable/disable video calling features and shi... stream explorer.
  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  )

}

// so now the shi is done, now in next commit we deploy.
export default CallPage;
