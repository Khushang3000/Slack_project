import "../styles/auth.css"
import { SignInButton } from '@clerk/clerk-react'

const AuthPage = () => {
  return (
    <div className="auth-container">
        <div className="auth-left">
            <div className="auth-hero">
                <div className="brand-container">
                    {/* src from public folder. */}
                    <img src="/logo.png" alt="slap" className="brand-logo"/>
                    <span className="brand-name">Slap</span>
                </div>
                <h1 className="hero-title">
                    Where Work Happens ✨
                    {/* can copy the emoji from emojipedia */}
                </h1>
                <p className="hero-subtitle">
                    Connect with your team instantly through secure, real-time messaging. Experience
                    seamless collaboration with powerful features designed for modern teams.
                </p>
                <div className="features-list">
                    <div className="feature-item">
                        <span className='feature-icon'>💬</span>
                        <span>Real Time Messaging</span>
                    </div>
                    <div className="feature-item">
                        <span className='feature-icon'>📹</span>
                        <span>Video Calls and Meetings</span>
                    </div><div className="feature-item">
                        <span className='feature-icon'>🔒</span>
                        <span>Secure and private</span>
                    </div>
                </div>

                <SignInButton mode="modal">
                    {/* to override clerk's signinButton we can just give our own button below. */}
                    <button className="cta-button">
                        Get Started with Slap
                        <span className="btn-arrow">→</span>
                    </button>
                </SignInButton>
            </div>
        </div>
        <div className="auth-right">
            <div className="auth-image-container">
                <img src="/auth-i.png" alt="Team Collaboration" className="auth-image" />
                <div className="image-overlay"></div>
            </div>
        </div>
    </div>
  )
}//now go to index.css to get rid of the margins.
// now since we have our auth page ready now we can work on the home page, but before that we gotta setup our stream on frontend, so we'll install some of the stream packages for frontend also we're gonna install 
// we'll use react-hot-toast library which is gonna give us nice alerts, we'll also be using tanstack query which will be useful for fetching data.
// so let's get started by installing the packages. in frontend go npm i stream-chat stream-chat-react react-hot-toast
//now  we'll install some more packages npm i axios(we won't be using fetch) @tanstack/react-query
// to install a specific version you could do npm i axios@1.11.0


//now go to main.jsx to implement tanstack query, also btw read docs.
// it basically manages states, const {data, error, loading}= useQuery();
// we use tanstack query To easily fetch, cache, and update data from an API in React apps — without manually handling loading states, errors, or re-fetching logic.
// most of the time we set this up in the main file. we just wrapped our app with the queryClient provider.
// we're done with tanstack query setup, now we'll setup react hottoast. go to main.jsx again and see the toaster.component, and there we can also add a position of the toaster,
//as to where will the toaster show up.
//now add       <button onClick={()=>{toast.success("Congrats")}}>success</button>
// and on click of the button we can see a nice little success toast, there's also toast.error or warning n much more.

// now we'd like to setup one more thing which is going to be the authProvider. right now when we log in through clerk, our browser knows that this user is logged in,
//but let's say we send a request to the server, but here our server doesn't know whether the user is authenticated or not. so what we can do is send a token with our request so that server can check whether the user is authenticated or not.
//so basically on every single request we'll send token.
//so in frontend itself, create a lib folder and make a file axios.js, see it.


export default AuthPage