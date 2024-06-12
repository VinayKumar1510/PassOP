import React from 'react'

const Navbar = () => {
    return (

        <nav className='rounded-xl shadow-xl shadow-blue-500'>
            <div className="mycontainer text-white text-xl flex items-center justify-between h-10 py-6">
                <div className="logo font-semibold text-2xl cursor-pointer">
                    
                    <span className='text-2xl text-orange-700'>&lt;</span>
                    Pass
                    <span className='text-2xl text-orange-700'>OP /&gt;</span>
                    </div>

                <button className='flex gap-2 mr-6 text-black font-semibold bg-slate-500 px-2 rounded-full hover:bg-slate-950 hover:text-white'>
                    <img className='w-10 p-1' src="/icons/github.png" alt="github logo" />
                    <span className='mt-1'><a href="https://github.com/" target="_blank">Github</a></span>
                </button>

            </div>
        </nav>
    )
}

export default Navbar
