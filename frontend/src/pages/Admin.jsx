import React from 'react'
// import { assets } from '../assets/assets'
function Admin() {
    const navigateToAdmin = () => {
        // Replace this URL with your Admin app's URL
        window.location.href = import.meta.env.VITE_ADMIN_URL;
    };
return (
<div className='flex flex-col items-center justify-center gap-6 text-gray-600 mt-8'>
<p>Welcome to the Admin Dashboard!</p>
<p>Manage doctors, patients, appointments, and system settings efficiently.</p>
<button onClick={navigateToAdmin} className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500' >
    Go to admin page
</button>
</div>

)
}

export default Admin
