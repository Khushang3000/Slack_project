import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const HomePage = () => {
  return (
    <div className='bg-red-300'>
        {/* userbutton to signout */}
        <UserButton/>
        Home page.    
    </div>
  )
}

export default HomePage