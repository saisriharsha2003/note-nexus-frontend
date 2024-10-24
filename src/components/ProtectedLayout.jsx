import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedLayout = ({permissions}) => {
  const token=localStorage.getItem("token");
  if(!token){
    return <Navigate to={"/"} />
  }
  return (
    <div >
      <div >
        <div className='w-fit '>
        </div>
        <div >
          <Outlet/>
        </div>
        
      </div>
   
    </div>
  )
}

export default ProtectedLayout;

