import React from 'react'
//now firstly get rid of the assets. and also clear out index.css.
//oh and env.local is our env file here.
// now go to clerk auth, select the project, and then select react. follow sdk.
//add publishable key in env file.
//then get it in the main.jsx. go
//after getting thte components here, let's run npm run dev
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';//importing first ofc.
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';



const App = () => {
  return (
    <>
      <SignedOut>
        {/* if user is signed out show these routes*/}
        <Routes>
          {/* if path is /auth and user is signedout, then show the homepage. */}
          <Route path='/auth' element={<AuthPage/>}/>
          {/* if user is signed-out and wants to visit any other page then send them to the auth page. */}
          <Route path='*' element={<Navigate to={"/auth"} replace/>}/>
        </Routes>
      </SignedOut>
      <SignedIn>
        {/* if user is signed in then show some couple of routes */}
        <Routes>
          {/* if path is / and user is signed in, then show the homepage. */}
          <Route path="/" element={<HomePage />} />
          {/* if user is already signed in and tries to visit auth page then take them back to the homepage. */}
          <Route path="/auth" element={<Navigate to={"/"} replace/>} />
        </Routes>
      </SignedIn>
      {/* now when you first click the sign in button, it'll take you to the clerk auth page, where you can see the apple github and google sign in buttons which you can configure in the configure tab in clerk.
      but if we give the mode="modal", to the signinbutton, that signin page provided by clerk will be shown as a modal. make sure to use " " 
      now sign up, and once you as a user are authenticated, it'll show the user's photo in a circle, basically a user button,
      on clickin that button you can have multiple options, to sign out and much more. the best thing is that this stores the token or some shi in cookies, 
      also the settings you can configure. remember, token is stored in the browser cookies for frontend, now when the frontend makes a request to the backend, it sends that cookie with the req to the backend, and that's where the backend checks authentication of the user by verifying the token's signature using a secret key.THAT'S JWT OR TOKEN BASED AUTH FOR YA.*/}
      {/* now for the session based auth, there are no tokens in session.
      Backend creates a session object when the user logs in and stores it in memory/DB.
      Backend sends a session ID cookie to the frontend.
      Frontend automatically sends that session ID cookie with requests.
      Backend looks up the session object using the session ID.
      Session object contains user info (maybe even a token for other APIs) → backend now knows who the user is. 
      the backend does store something (the session object), but it’s usually the session ID or user info, not necessarily the token itself.
      so basically both the concepts work the same way in the checking part, but one uses token and secret key to verify, and other uses session id and session object
      */}

      {/* enough off topic, now for the user, you can see him in your clerk, users tab. but we have a problem here, user is not in the database of our application. mongodb/cluster/collections
      //so we gotta get that user from clerk and save it in our mongodb database.and we know that clerk and mongodb are two different services, so we gotta let them communicate with each other.
      // so basically clerk takes that user when they login and then stores that user in it's database, now we just gotta add that user in the mongodb collection.
      // so we can ask clerk for like an event like user.isCreated, this event is exactly what we call a WEBHOOK, so basically clerk will send us an event and say HEY, an event has just been created(user has been created) and then will also give us data like here's the user id (no need of password as this is O-auth anyways.
      // we'll take this data and save it to the database. BUT where will this event go to? our server ofc, where we'll do the process of adding the user to the db, 
      // and that's where we'll use inngest. So clerk will send a webhook to our inngest account and then our inngest account must've had any background job that will create the user in our db.
      // and we'll write this inngest function, now it'll do something like this, if the event is user.isCreated then take the data and store that in db as a user object.
      // same way clerk can send us a event like user is deleted. and inngest will have another function that will basically delete the event.
      // so let's do that, it's actually easier than you think. now ofc we'll write it on the backend, but before that, we have authentication up and running on the frontend but not on the backend
      // we've already installed clerk on the backend already, so we'll set it up on server.js, there's a component called clerkMiddleware, oh and btw in new nextjs it's renamed to proxy
      // so go there use it as a middleware in app.use(clerkMiddleware()), and then just come back here as we'll talk shi about webhooks.
      // now we'll setup the webhook that clerk will send to inngest. go to clerk dashboard, then configure. now create endpoint, you can create webhook manually or just use inngest, select inngest instead of webhook, we'll be connecting to inngest but first go to inngest website.
      // log-into your account, now go back to the clerk webhook and connect with inngest, it's gonna open inngest, approve, now in clerk you might have gotten the webhook url.
      // then go to inngest->then webhooks, you gonna see a clerk webhook, now go to clerk scroll down to the webhook page and create that webhook. now the link to that webhook will be copyable 
      // now under the event catalog you can see a bunch of different events, if you scroll down, you'll see events like user.created user.deleted and user.updated.
      // you can also see the data you get when the user is created, now we can take those fields and save em to our database.
      // now go to inngest cloud, apps, and we'll sync a new application. but first let's write those background jobs/functions that are gonna interact with the database according to the webhook we get
      // before that you can go to inngest express or nodejs documentation. follow the setup steps. npm i inngest,
      // then skip the dev server one as we don't need to run the dev server. and lastly we will write the inngest.js file under the config folder where all our jobs or functions will go.*/}
    </>
  )
}

export default App