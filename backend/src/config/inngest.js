import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });


const syncUser = inngest.createFunction(//in this function we basically will just take the user from clerk and save the user in the database.
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event})=>{
        //this is the function where we save the user in the database, so firstly let's create a user model. User.js or user.model.js

        //first thing we'll do is connect with our database.
        await connectDB();

        const {id, email_addresses, first_name, last_name, image_url} = event.data;//if you remember in event catalog this is the kinda data we saw.

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url

        };

        await User.create(newUser);

        // TODO: do more things here.
    }


)//and this was the function on how we can create the user.


// function to delete the user.

const deleteUserFromDB = inngest.createFunction(//in this function we basically will just take the user from clerk and save the user in the database.
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({event})=>{
       const {id} = event.data;
       await User.deleteOne({clerkId: id})

        // TODO: do more things here.
    }


)




// Create an array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];//here we'll put functions like create user in database or delete or update the user in the database.

//now that we have setup our functions let's see the next step in the inngest documentation and go back to 