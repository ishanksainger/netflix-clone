import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authApi';

const LoginForm = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = formData

    const handleChange = (e) => {
        setFormData((prev) => ({
            //this [e.target.name] will be replaced by the dynamic name which will be sent by e through onchange
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(email,password,navigate))
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative'>
            <input type="text" name="email" value={email} onChange={handleChange} placeholder='Login or Sign In' required
                className='bg-[#333] h-[50px]  leading-[50px] p-[16px] px-[20px] pb-0 rounded border-0 flex items-center'
            />
            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleChange} placeholder='Enter Password' required
                className='bg-[#333] h-[50px] leading-[50px] p-[16px] px-[20px] pb-0 rounded border-0 my-6' />
            <span className=' absolute right-3 top-[106px] z-[10] cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                {password ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            <button
                type="submit"
                className=" rounded-md text-base font-bold bg-[#e50914] p-4"
            >
                Sign In
            </button>
        </form>
    )
}

export default LoginForm