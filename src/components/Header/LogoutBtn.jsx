import React from 'react'
import {useDispatch} from 'react-redux'
import AuthService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {

  const dispatch = useDispatch()
  const logoutHandler = () => {  
    AuthService.logout().then(() =>  {
      dispatch(logout())
    })
  }

  return (
    <button className='bg-red-500 text-white px-4 py-2 rounded-md' 
    onClick={logoutHandler}
    > 
      Logout
    </button>
  )
}

export default LogoutBtn
