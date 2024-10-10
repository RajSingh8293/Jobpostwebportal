/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { updateProfileImage } from '@/redux/slices/userSlice'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { CiCamera } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const UpdateProfileImage = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading } = useSelector((state) => state.auth)
    // const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState("")
    // const [profileImage, setProfileImage] = useState("")
    const [userData, setUserData] = useState({
        profileImage: null
    })

    console.log("user :", user);

    const onchangeFileHandler = (e) => {
        setUserData({ ...userData, profileImage: e.target.files[0] })
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }


    const updateHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("profileImage", userData.profileImage);
        dispatch(updateProfileImage(formData))

        // try {

        // const formData = new FormData()
        // formData.append("profileImage", userData.profileImage);
        //     console.log(formData);
        //     setOpen(false)

        //     setLoading(true)
        // const { data } = await axios.put(
        //     `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/user/update/profile-image`,
        //     formData,
        //     axiosConfig,
        // )
        // console.log(data?.user);
        // if (data.success) {
        //     dispatch(setUser(data?.user))
        //     toast.success(data.message)
        //     navigate('/')
        // }
        //     setLoading(false)
        // } catch (error) {
        //     console.log(error);
        //     setLoading(false)
        // }
    }


    useEffect(() => {
        setUserData({
            profileImage: user?.profileImage?.url || null
        })
    }, [user])

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10" >
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

                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    <img src={imagePreview} alt="" />
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    <label className="" >Profile Image </label>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        name='profileImage'
                                        onChange={onchangeFileHandler}
                                        className='w-full h-full col-span-3 border outline-none py-1 px-2'
                                        placeholder=' '
                                    />
                                </div>
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

        </Dialog >
    )
}

export default UpdateProfileImage

