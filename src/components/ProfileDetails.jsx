import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/operations/authApi'
import IconBtn from './IconBtn'

const ProfileDetails = () => {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if (!user) return null

    return (
        <>
            <Link to="/">Home</Link>
            {/* <p>Welcome {user.firstName}</p> */}
            <Link to="/my-profile"><p>Profile</p></Link>
            <IconBtn onClick={() => { dispatch(logout(navigate)) }} text="Logout" />
        </>
    )
}

export default ProfileDetails