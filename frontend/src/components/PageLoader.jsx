//npm i lucide-react, it is the icon library that we'll be using.
import {LoaderIcon} from 'lucide-react';

const PageLoader = ()=>{
    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <LoaderIcon className="text-white animate-spin size-10 text-primary"></LoaderIcon>
    </div>
    )
}

export default PageLoader
// rn there might be a problem tho, as we're sending the request from frontend to the backend
// and in backend we ain't handling the cors