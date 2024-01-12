import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDetails from './ProfileDetails';
import IconBtn from './IconBtn';

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='w-full z-20 relative'>
            <div className='flex justify-between p-4 bg-transparent'>
                <Link to="/" className='w-[140px] sm:w-[200px] p-2 md:w-[200px] sm:flex-shrink-0'>
                    <img src={logo} alt="Logo" />
                </Link>
                <div className='flex gap-2 p-2 justify-center items-center text-white relative'>
                    {token === null && (
                        <Link to="/login">
                            <p>Login</p>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/signup">
                            <IconBtn text="Signup" />
                        </Link>
                    )}
                    {token !== null && (
                        <div className='sm:hidden'>
                            <button onClick={toggleMobileMenu}>
                                <IconBtn text="Menu" />
                            </button>
                            {isMobileMenuOpen && (
                                <div className='absolute top-full -right-[10px] w-[237px] h-[200px] bg-black' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '10px'}}>
                                    <div className=' opacity-100 flex items-center justify-center flex-col gap-8'>
                                        <ProfileDetails />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {token !== null && (
                        <div className='hidden sm:flex sm:gap-4 justify-center items-center font-bold'>
                            <ProfileDetails />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
