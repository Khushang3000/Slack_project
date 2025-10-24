import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; //in vite to get env variables we don't do process.env, instead import.meta.env.


if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
// using it in the clerkprovider component.


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* wrapping our application with clerk provider. now just go and create the app with clerk component. */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
    </ClerkProvider>
  </StrictMode>,
)
