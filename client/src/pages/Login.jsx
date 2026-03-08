import React from 'react'
import { Star } from 'lucide-react'
import {SignIn} from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className='login-screen'>
      {/* Left side: Branding Text */}
      <div className='brand-container'>
        <img src="/logo-4.png" alt="Logo" className="logo max-md:absolute max-md:top-0 max-md:right-0" />
        <div>
          <div className='brand-content'>
            <img src="/user-grp.png" alt="User Group" className='h-10 md:h-18'/>
            <div>
              <div className='flex'>
                {Array(5).fill(0).map((_, i)=>(<Star key={i} className='star'/>))}
              </div>
              <p className='text-[12px] md:text-sm text-gray-200'>Used By 10K+ Developers</p>
            </div>
          </div>
          {/* Title Goes Here */}
          <h1 className='title'>
            Welcome to HobbyHub
          </h1>
          <p className='subtitle'> 
            Where Hobbies Bring People Together
          </p>
        </div>
        <span className='md:h-20'></span>
      </div>
      {/* Right side: Login Form */}
      <div className='login-container'>
        <SignIn />
      </div>
    </div>
  )
}

export default Login