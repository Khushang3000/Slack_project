import { axiosInstance } from "./axios";

export async function getStreamToken(){
    
    //remember we have an api endpoint which gives us a streamToken, in /chat/token, baseUrl we set in axios.js. axiosInstance.
    try {
        // console.log("getStreamToken frontend called")
        const response = await axiosInstance.get("/chat/token");
        // console.log("request to backend sent");
        return response.data;
    } catch (error) {
        console.error("Error fetching stream token:", error.message);
        console.error("Full error object:", error);
    }
    
    
}