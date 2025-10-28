import { axiosInstance } from "./axios";

export async function getStreamToken(){
    //remember we have an api endpoint which gives us a streamToken, in /chat/token, baseUrl we set in axios.js. axiosInstance.
    const response = await axiosInstance.get("/chat/token");//if this was a post req or delete req then we woulda done .post or .delete.
    return response.data;
}