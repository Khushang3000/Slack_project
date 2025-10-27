import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {Toaster} from 'react-hot-toast';
import AuthProvider from './providers/AuthProvider.jsx'
import React from 'react'
// Sentry
import {
  Routes,
  Route,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router";
import * as Sentry from '@sentry/react';
// Sentry

const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; //in vite to get env variables we don't do process.env, instead import.meta.env.


if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
// using it in the clerkprovider component.

Sentry.init({
  dsn: "https://3b07b8595c7a7f968ad2991c0b2f6358@o4510073516916736.ingest.us.sentry.io/4510261809577984",
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* wrapping our application with clerk provider. now just go and create the app with clerk component. */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <Toaster position='top-right'/>
      </QueryClientProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
