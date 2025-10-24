import React from 'react'
//now firstly get rid of the assets. and also clear out index.css.
//oh and env.local is our env file here.
// now go to clerk auth, select the project, and then select react. follow sdk.
//add publishable key in env file.
//then get it in the main.jsx. go
//after getting thte components here, let's run npm run dev
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';//importing first ofc.



const App = () => {
  return (
    <header>
      <SignedOut>
        {/* if user is signed out show a sign in button. */}
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        {/* if user is signed in then show a user button. */}
        <UserButton />
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
      // so we can ask clerk for like an event like user.isCreated, this event is exactly what we call a WEBHOOK */}
    </header>
  )
}

export default App