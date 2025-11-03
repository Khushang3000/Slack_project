import { useEffect, createContext } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    //setup axios interceptor
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
          //we're basically adding our token under the bearer key, so basically by doing this backend will know if we're authenticated by checking whether this token is valid or not.
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authentication issue. Please Refresh the Page.");
          }
          console.log("Error getting the token.", error);
        }
        return config;
      },
      (error) => {
        //this 2nd arg is an error handler.
        console.error("Axios request error: ", error);
        return Promise.reject(error);
      },
    );

    //cleanup function to remove interceptor, this is important to avoid memory leaks.
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]); //every single time getToken method is called useEffect will run.

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

// so here we have created a context, and we're using the useAuth hook, so that we can get the token, if we have the token then we include that token in our headers,
//request.use() line// it means that at every single request token will be sent to our backend so that our server knows that we're authenticated or not.
//so that's exactly what component does, now we use this component to wrap our App.jsx in main, that means that in our application each request will include a token.
//the reason we're sending token on each request is cuz we want our backend to know whether the user is authenticated or not.
//now that we already have sentry for backend, let's also implement it for the frontend, we'll use Sentry Tracing, it tracks how your app performs by measuring how long operations take,
// and where slowdowns happen. so search for sentry i.o react router v7 tracing, go to docs.
// we'll be using the library mode, we'll be using the Routes component. npm i @sentry/react,
//now go to main.jsx, and see the setup docs as well, Sentry.init, now for it's dsn we gotta again get that dsn string from sentry by creating a new project(this one is for frontend)
//now all that remains is to wrap our routes with sentry routes.see app.jsx, there we'll first create SentryRoutes, and instead of normal Routes we'll use SentryRoutes.

//in the upcomming sections we can add some buttons just to test this out or if we have any errors then we can see those in the sentry dashboard. also create a button under app.jsx which onclick throws a error(error thrown on the frontend), which we'll see in sentry frontend project.
//our brave has adblocker which might stop the app's button to send a error post request to sentry, so run the app on edge.
//now when you go to sentry/issues/feed you can see the error report.

// now in this commit we'll create a custom hook which we'll use to get the channels, direct messages nd shi.
//hooks/useStreamChat.js
