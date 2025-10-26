import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const HomePage = () => {
  return (
    <div>
        {/* userbutton to signout */}
        <UserButton/>
        Home page.    
    </div>
  )
}

export default HomePage