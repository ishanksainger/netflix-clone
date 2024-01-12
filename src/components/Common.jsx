import React from 'react'
import wallpaper from '../assets/wallpaper.jpg'
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Common = (props) => {
    const { title, formType } = props;

    const {loading}=useSelector((state)=>state.auth);

    return (
        <div className=' w-full h-screen z-10 absolute top-0 grid place-items-center' style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
        {loading ? (<div class="custom-loader"></div>) :
            <div className='w-auto sm:w-[500px]'>
                <div className='bg-black bg-opacity-75 min-h-[660px] flex flex-col p-[20px] px-[28px] pb-[20px] sm:p-[60px] sm:px-[68px] sm:pb-[40px] text-white'>
                    <h3 className=' text-3xl font-bold mb-7'>{title}</h3>
                    {formType === 'signup' ? <SignupForm /> : <LoginForm />}
                    <p className='text-[#737373] text-base mt-4 font-semibold'>New to Netflix? {formType === "signup" ? (<Link to="/login">Login now.</Link>) :
                        (<Link to="/signup">Sign up now.</Link>)}</p>
                </div>
            </div>
        }
        </div>
    )
}

export default Common