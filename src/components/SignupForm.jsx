import React, { useState } from 'react'
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../slices/authSlice';
import { signup } from '../services/operations/authApi';
import IconBtn from './IconBtn'

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const {firstName, lastName ,email, password, confirmPassword } = formData

    const handleChange = (e) => {
        setFormData((prev) => ({
            //this [e.target.name] will be replaced by the dynamic name which will be sent by e through onchange
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Password Dont Match")
            return
        }
        dispatch(setSignupData(formData))
        dispatch(signup(firstName, lastName ,email, password, confirmPassword, navigate));
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative'>
            <input type="text" name="firstName" value={firstName} onChange={handleChange} placeholder='Enter your FirstName' required
                className='bg-[#333] h-[50px]  leading-[50px] p-[16px] px-[20px] pb-0 rounded border-0 flex items-center'
            />
            <input type="text" name="lastName" value={lastName} onChange={handleChange} placeholder='Enter your LastName' required
                className='bg-[#333] h-[50px]  leading-[50px] p-[16px] px-[20px] pb-0 rounded border-0 flex items-center'
            />
            <input type="text" name="email" value={email} onChange={handleChange} placeholder='Enter your Email id' required
                className='bg-[#333] h-[50px]  leading-[50px] p-[16px] px-[20px] pb-0 rounded border-0 flex items-center'
            />
            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleChange} placeholder='Enter Password' required
                className='bg-[#333] h-[50px] leading-[50px] p-[16px] px-[20px] pb-0 rounded border-0' />
            <span className=' absolute right-3 top-[215px] z-[10] cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder='Enter Password again' required
                className='bg-[#333] h-[50px] leading-[50px] p-[16px] px-[20px] pb-0 rounded border-0 mb-6' />
            <span className=' absolute right-3 top-[281px] z-[10] cursor-pointer ' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            <IconBtn
                type="submit"
                customClasses=" rounded-md text-base font-bold bg-[#e50914] p-4" text="Sign Up" />
        </form>
    )
}

export default SignupForm