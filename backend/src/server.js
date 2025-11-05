import "../instrument.mjs"//STEP1 FOR SENTRY, STEP 2 IS WAY BELOW.
import express from 'express';
import dotenv from "dotenv";
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware, requireAuth, getAuth} from '@clerk/express'

import { functions, inngest } from './config/inngest.js';
import { serve } from "inngest/express";
import chatRoutes from './routes/chat.route.js'
import cors from 'cors'
import * as Sentry from '@sentry/node';

const app = express();

app.use(express.json())//this allows you to req.body where you have some json data.

// const PORT=process.env.PORT||5001;, added localhost as client url for bug checking in the frontend.
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}))//credentials: true allows users to send cookies, in which they can send the token


// console.log('Mongodb url is', ENV.MONGODB_URI)//this runs on the server file, when this server file runs, and the .get is through express router.
//as we don't need to log mongodb_uri to console.

//using clerkMiddleware.
app.use(clerkMiddleware())//with this we can basically check if the user is authenticated. this basically attaches an auth object to the req and through that we can check whether the user is authenticated or not.
//like req.auth.isAuthenticated.
// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage

app.get("debug-sentry",(req, res)=>{
    throw new Error("My First Sentry Error.")
})

//endpoint 
app.get('/',(req,res)=>{
    res.send('Hello World');
    //remember res.send sends a string, but res.json sends the json object.
})

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", requireAuth(),chatRoutes);


// // TO protect our routes. add this as a middleware.
// app.get('/protected', requireAuth(), async (req, res) => {
//   // Use `getAuth()` to get the user's `userId`
//   const { userId } = getAuth(req)
  
//   // Use Clerk's JavaScript Backend SDK to get the user's User object
//   const user = await clerkClient.users.getUser(userId)

//   return res.json({ user })
// })

// app.listen(ENV.PORT,()=>{
//     console.log("Server is listening on port", ENV.PORT);
//     connectDB();//connecting to database. right after server is running.
// })//now npm run dev and see the magic, now we can setup our other env variables like clerk when we'll use it for authentication or some other shi.
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
//now, firstly go to main branch(checkout), then git pull origin main --rebase(this keeps our local code/repo up to date with the remote repo, as we compare pull and merge the other branch's request on remote(github),
//so we gotta keep our local code updated. after merging a branch to main you could go to main branch and then delete the merged branch or vice versa as it is your choice, as we just need to keep the local code updated with reference to the remote(where we compared pull request and merged it,
//oh and btw, you directly create pull request of a branch by git push -u origin <branch_name>)).(just adds the local commits, and keeps the remote branch up to date), and then lastly run git merge db-config.
//now make sure you're on branch main, and then only delete the db-config branch which is merged already, git branch -D db-config.
//now lastly, in this new section we'll work on authentication and deploying our api.
//we'll implement auth in frontend. so go to that folder, delete app.css, clear out app.jsx, rafce and go there.


// STEP2 FOR SENTRY- after you have written all the requests, 
Sentry.setupExpressErrorHandler(app); //and we're done setting up our app for express. also see the sentry-debug error route where we are intentionally throwing an error so that we can check on sentry.
//now the last thing is in our package.json scripts add NODE_OPTIONS='--import ./instrument.mjs'.
//now just npm run dev, and visit the endpoint, and since the error is thrown, you'll get it's report in your sentry account. but before that rename instrument.js to .mjs.
//now in next commit we'll get started with the auth page. that'll be frontend, so go there create the components, pages and styles folder, 
//under styles create auth.css file, you can see it and hell even you could generate it with ai.now we're gonna install react-router-dom, well it was the older name, now it's just react-router, npm i react-router
// n then wrap the app component with the browser router component.
//now create authpage and home page, in the pages folder. now see app.jsx



//since we'll be deploying on vercel, it doesn't want that our app listens on a single port everytime like we did in dev environment with localhost3000,
const startServer =async ()=>{
    try {
        await connectDB();//this connectDB runs as soon as our app is live on a port, or is live somewhere. all the other functions that we wrote above were
        //acced through routes, and routes will only be available once app is setup on a server. i.e app has started listening.
        if(ENV.NODE_ENV !== "production"){//only if the environment is dev, then listen on a port, if it's prod environment then don't listen to any port forever as our app will be deployed on vercel

            app.listen(ENV.PORT,()=>{
                console.log("Server is listening on port", ENV.PORT);
                connectDB();//connecting to database. right after server is running.
            })
        }
    } catch (error) {
        console.error("Error starting server", error);
        process.exit(1);//exit process with failure code
    }
}//now we'll push this to github branch, now after we have fixed the inngest(where we removed connectDB, see it) in the next commit we'll have our deployed api.
//also remember to not add the node_env environment variable, if the deployment fails just see the logs. they give you better idea of how to fix.

//now firstly when you deploy the api, copy the site link, and in inngest cloud-> apps-> sync new app -> you'll see the signkey and below it, paste our deployed api's url.
//also don't forget to add api/inngest to that url as that is our inngest, you can see it above as well, that serve thing, and there is where our functions go.
//now sync app, you'll see two functions, now firstly delete the user from the frontend, by signing in first and then right through userbutton delete it.
//now login again, in inngest you'll see a function running, that's sync user, and now you can even check your mongodb database, the user will be added.
//in inngest under the runs tab, you can see the functions that are or have been ran before. and in mongodb your user would have been stored.

//now in this commit we'll do the stream setup. since we're adding user to mongodb on successful clerk login, we'll also do a stream setup where we will store that user in stream database as stream needs info like user profile image and much more.
//and how they'll send messages between different users. now before we install stream in our backend. npm i stream-chat
//and then create a config file called stream.js.
startServer()

export default app;