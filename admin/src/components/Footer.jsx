import React from 'react'

function Footer() {
    const navigateToHome = () => {
        // Replace this URL with your frontend app URL
        window.location.href = import.meta.env.VITE_FRONTEND_URL;
    };
return (
        <div className='flex flex-col items-center justify-center gap-4 mt-2'>
            <button onClick={navigateToHome} className='border border-black px-8 py-4  hover:bg-black hover:text-white transition-all duration-500' >
                Go to Home Page
            </button>
            <hr/>
            <p className='py-5  text-center'>Copyright 2023 &copy; HealthMeet.com - All Right Reserved.</p>
        </div>
)};

export default Footer
