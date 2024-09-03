/* eslint-disable react/prop-types */
import { updateUser } from '@/redux/slices/userSlice'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'


const UpdateProfile = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const [loading, setLoading] = useState(false)
    const { user, loading } = useSelector((state) => state.auth)


    const [userData, setUserData] = useState({
        username: user?.username,
        email: user?.email,
        location: user?.location,
        phone: user?.phone,
    })


    // let axiosConfig = {
    //     withCredentials: true,
    // }

    const onchangeHandler = (e) => {
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }



    const updateHandler = async (e) => {
        e.preventDefault()
        dispatch(updateUser(userData))
        // try {
        //     dispatch(setLoading(true))
        //     const { data } = await axios.put(
        //         `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/user/update/me`,
        //         userData,
        //         axiosConfig,
        //     )
        //     console.log(data);
        //     if (data.success) {
        //         toast.success(data.message)
        //         dispatch(setUser(data.user))
        //         navigate('/profile')
        //     }
        //     dispatch(setLoading(false))
        // } catch (error) {
        //     console.log(error);
        //     dispatch(setLoading(false))
        // }
    }


    return (

        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className=" relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                            <div className=" my-2 sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as='h1' className="text-2xl font-semibold text-gray-900">
                                    Update Profile
                                </DialogTitle>
                                <div className="top-0 right-0 absolute mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-b hover:bg-red-600 hover:text-white sm:mx-0 sm:h-10 sm:w-10 font-bold cursor-pointer" onClick={() => setOpen(false)}>
                                    X
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-3 ">
                                    <label className="" >Username </label>
                                    <input
                                        type="text"
                                        onChange={onchangeHandler}
                                        value={userData?.username}
                                        name='username'
                                        className='w-full col-span-3 border outline-none py-1 px-2'
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    <label className="" >Email</label>
                                    <input
                                        type="email"
                                        onChange={onchangeHandler}
                                        value={userData?.email}
                                        name='email'
                                        className='w-full col-span-3 border outline-none py-1 px-2'
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    <label className="" >Location</label>
                                    <input
                                        type="text"
                                        onChange={onchangeHandler}
                                        value={userData?.location}
                                        name='location'
                                        className='w-full col-span-3 border outline-none py-1 px-2'
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    <label className="" >Phone</label>
                                    <input
                                        type="number"
                                        onChange={onchangeHandler}
                                        value={userData?.phone}
                                        name='phone'
                                        className='w-full col-span-3 border outline-none py-1 px-2'
                                    />
                                </div>


                                {/* <div className="mt-4 grid grid-cols-4 gap-3">
                                    <label className="" >Phone</label>
                                    <input
                                        type="number"
                                        onChange={onchangeHandler}
                                        value={userData?.phone}
                                        name='phone'
                                        className='w-full col-span-3 border outline-none py-1 px-2'
                                    />
                                </div>

                                {
                                    user?.role === "student" &&
                                    <div className="mt-4 grid grid-cols-4 gap-3">
                                        <label className="" >Skills</label>
                                        <input
                                            type="text"
                                            onChange={onchangeHandler}
                                            value={userData?.skills}
                                            name='skills'
                                            className='w-full col-span-3 border outline-none py-1 px-2'
                                        />
                                    </div>}

                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    <label className="" >Bio</label>
                                    <input
                                        type="text"
                                        onChange={onchangeHandler}
                                        value={userData?.bio}
                                        name='bio'
                                        className='w-full col-span-3 border outline-none py-1 px-2'
                                    />
                                </div>
                                {
                                    user?.role === "student" &&
                                    <div className="mt-4 grid grid-cols-4 gap-3">
                                        <label className="" >Resume</label>
                                        <input
                                            type="file"
                                            accept='application/pdf'
                                            name='file'
                                            onChange={onchangeFileHandler}
                                            className='w-full col-span-3 border outline-none py-1 px-2'
                                        />
                                    </div>
                                } */}
                                <div className='mt-4 w-full'>
                                    <button
                                        type="submit"
                                        onClick={updateHandler}
                                        className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 "
                                    >
                                        {
                                            loading ? "Loading" : "Update"
                                        }

                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>

        </Dialog>

    )
}

export default UpdateProfile


