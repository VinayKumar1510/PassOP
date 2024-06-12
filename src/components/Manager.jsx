import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()


    }, [])


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 8) {

            // If any such id exists in the db, delete it
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id:form.id})})



            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id:uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast('Error : Password not saved !')
        }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id " + id)
        let c = confirm("Do you really want to delete this password")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})

            toast('Password deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }

    }

    const editPassword = (id) => {
        toast('Edited successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        console.log("Editing password with id " + id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />
            <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="mycontainer w-[80vw]">
                <h1 className='text-4xl text-center font-semibold'>
                    <span className='text-2xl text-orange-500'>&lt;</span>
                    <span className='text-white text-2xl'>Pass</span>
                    <span className='text-2xl text-orange-500'>OP /&gt;</span>
                </h1>
                <p className='text-orange-500 font-semibold text-center'>Your own Password Manager</p>
                <div className="text-white flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-lg bg-slate-950 border border-white text-white w-full p-4 py-1 hover:shadow-lg hover:shadow-green-500 hover:bg-slate-900' type="text" name='site' id='site' />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-lg bg-slate-950 border border-white text-white w-full p-4 py-1 hover:shadow-lg hover:shadow-green-500 hover:bg-slate-900' type="text" name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-lg bg-slate-950 border border-white text-white w-full p-4 py-1 hover:shadow-lg hover:shadow-green-500 hover:bg-slate-900' type="password" name='password' id='password' />
                            <span className='absolute right-[2px] top-[2px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-slate-800 w-fit rounded-full px-4 py-2 hover:bg-slate-950 hover:border border-white gap-2 hover:shadow-lg hover:shadow-blue-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/rdfmytjv.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#e4e4e4">
                        </lord-icon>
                        Save</button>
                </div>

                <div className="passwords text-white mt-6">
                    <h2 className='font-semibold text-3xl underline decoration-slate-300 shadow-xl shadow-red-500 inline'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div className='text-xl mt-5'>Nothing to show here</div>}

                    {passwordArray.length != 0 && <table className="table-auto w-[80vw] mt-9 shadow-xl shadow-orange-500 rounded-xl">
                        <thead>
                            <tr>
                                <th className='py-2 text-2xl'>Site</th>
                                <th className='py-2 text-2xl'>Username</th>
                                <th className='py-2 text-2xl'>Password</th>
                                <th className='py-2 text-2xl'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='justify-center flex py-2 text-center'><a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='flex items-center justify-center '>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#ffffff,secondary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#ffffff,secondary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#ffffff,secondary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 text-center'>
                                        <span className='cursor-pointer m-2' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#ffffff,secondary:#ffffff"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                        <span className='cursor-pointer m-2' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/drxwpfop.json"
                                                trigger="hover"
                                                state="morph-trash-in"
                                                stroke="bold"
                                                colors="primary:#ffffff,secondary:#ffffff"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    }
                </div>

            </div>
        </>
    )
}

export default Manager
