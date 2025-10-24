import express from 'express';
import dotenv from "dotenv";
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware, requireAuth, getAuth } from '@clerk/express'

const app = express();


// const PORT=process.env.PORT||5001;

//endpoint 
app.get('/',(req,res)=>{
    res.send('Hello World');
    //remember res.send sends a string, but res.json sends the json object.
})

// console.log('Mongodb url is', ENV.MONGODB_URI)//this runs on the server file, when this server file runs, and the .get is through express router.
//as we don't need to log mongodb_uri to console.

// app.use(clerkMiddleware())
// // Use requireAuth() to protect this route
// // If user isn't authenticated, requireAuth() will redirect back to the homepage


// // TO protect our routes. add this as a middleware.
// app.get('/protected', requireAuth(), async (req, res) => {
//   // Use `getAuth()` to get the user's `userId`
//   const { userId } = getAuth(req)

//   // Use Clerk's JavaScript Backend SDK to get the user's User object
//   const user = await clerkClient.users.getUser(userId)

//   return res.json({ user })
// })

app.listen(ENV.PORT,()=>{
    console.log("Server is listening on port", ENV.PORT);
    connectDB();//connecting to database. right after server is running.
})//now npm run dev and see the magic, now we can setup our other env variables like clerk when we'll use it for authentication or some other shi.
//so go to clerk  scroll down to clerk components. those are the ui components we'll be using., go to the dashboard
// go to configure, configure settings there, remove email related ones, and just add google and apple and github, you can see the clerk component by clicking on the preview button.
//now go to the overview and follow the steps to add the ui to our app, in frontend ofc.
// from this step npm install @clerk/clerk-react, add a .env file there as well. paste the publishable key there.
//WE COULD HAVE DONE THAT BUT WE'RE GOING THE EXPRESS WAY, SO ON THE OVERVIEW INSTEAD OF REACT, SELECT THE EXPRESS ONE.
//FOLLOW THE INSTRUCTIONS, ADD KEYS IN THIS ENV FILE OF THE BACKEND.
//we'll see the working later but we're gonna, now update our env.js and then we gonna go to stream and get env variables from there.
//so go to stream, login, create app. keep environment development and select the closest region in databse and connection. Create App.
//we get two env variables, secret and key, so copy and paste em under the .env file. also add them in the env.js
//now let's get the sentry env variables. go to project, create new project. we'll go with express sdk.
//for project name, give slack-backend. later in the video we're gonna create the frontend as well. keep everything default and create the project.
//now you'll be on the sdk page. so follow the instructions. also, btw, there's gonna be Sentry.init(), there's gonna be a dsn, which is exposed so we'll just add as an env variable and then use that env variable in 
// dsn: part of Sentry.init, we'll follow the tutorial later, now the next thing is inngest, which we'll use to run some background jobs.
//it's actually more than just background jobs, there are gonna be scheduled and cron jobs, queuing and we can use it for ai agents, but here we'll be using it for some background jobs which are gonna be some functions.
//so that we can sync our authentication services with our datbase. so sign in to inngest. name the org and slug anything. create org.
//skip the invite members. npx inngest-cli@latest dev,
// now we need to get two different keys., on the right of production below inngest logo, there's a key icon, there we'll get event and signing keys.
//add those keys in the env. now it's time to commit.
//but we won't directly push to master/main branch, we will actually create a seperate branch, and then merge it later to the main branch. it's because maybe sometime you're not sure if you want the new feature to be implemented directly
//as it may cause errors, and if we directly push to the main branch, our production will break, that's why we gotta push this commit in a seperate branch, and if that version works, only then we merge it in the main branch.
//to merge we create a pull request, which is then accepted by the main branch. that's how it works in a company,
//they give you a feature to build, you create a new branch, build that feature, on your branch, you create a pull req to merge that feature in the main branch, 
//they say your code isn't clean and needs improvements, now you make changes and make more commits on your branch to fix and give them what they want and then you create a pull request,
//and then if they accept it then boom your feature is in the prod!!. and now you can delete the branch that you created.
//you can see which branch you're on rn, on the bottom left of vs code.
// git checkout -b <new-branch-name>, checkout from the current branch and work on a new one.
// git branch <new-branch-name>, if you wanna switch to a branch.
// git branch, to know which branch you currently are on.
//our new branch is db-config, and that is where we'll push this commit.
// git reset --soft HEAD~1, if you want to delete one commit, and keep the changes, --hard if you also wanna remove the changes.
//now when you do git add ., git commit -m, then when you do git push, do git push -u origin <branch_name>
//that you just created.
//when you merge the branch,go to another branch, usually main git checkout main just git branch -d db-config git push origin --delete db-config.
//now, firstly go to main branch(checkout), then git pull origin main --rebase.(just adds the local commits, and keeps the remote branch up to date), and then lastly run git merge db-config.
//now make sure you're on branch main, and then only delete the db-config branch which is merged already, git branch -D db-config.
//now lastly, in this new section we'll work on authentication and deploying our api.