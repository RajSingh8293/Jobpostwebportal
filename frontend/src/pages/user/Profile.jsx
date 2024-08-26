/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import Layout from "@/components/comp/Layout"
import Sidebar from "@/components/comp/Sidebar"
import { useEffect, useRef, useState } from "react"
import UpdateProfile from "./UpdateProfile"
import { MdOutlineEdit } from "react-icons/md";
import UpdateProfileImage from "./UpdateProfileImage";
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "@/components/comp/Spinner";


const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [imageOpen, setImageOpen] = useState(false)

    const { user, loading, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile')
        }

    }, [dispatch, navigate, isAuthenticated])
    return (
        <Layout>
            {loading ? <Spinner /> :
                <section className="min-h-screen px-10 py-16">

                    <div className="bg-white w-full flex flex-col gap-5  md:flex-row text-[#161931]">

                        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                            <Sidebar />
                        </aside>
                        <main className=" w-full min-h-screen">
                            <div className=" p-2 md:p-4">
                                <div className="border-b w-full px-6 pb-8  sm:rounded-lg">
                                    <h2 className="pl-6 text-2xl font-bold sm:text-xl">My Profile</h2>
                                    <div className="  grid mx-auto mt-8 ">
                                        <div className=" flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                            <div className="relative">
                                                {user && <button className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center hover:bg-green-600 bg-[green] rounded-full p-1"
                                                    onClick={() => setImageOpen(true)}
                                                >
                                                    <MdOutlineEdit fontSize={20} color="white" className=" rounded-full " />
                                                </button>}


                                                <div className="bg-white border-2 w-32 h-32 flex items-center justify-center rounded-full overflow-hidden object-cover">
                                                    {user && user?.profileImage?.url ? <img className="w-[100%] h-[100%] bg-center bg-cover  " src={user?.profileImage?.url} alt="" />
                                                        :
                                                        <button
                                                            className="button-upload"
                                                            onClick={() => setImageOpen(true)}
                                                        >
                                                            <CiCamera fontSize={40} className="opacity-50" />
                                                        </button>}
                                                </div>

                                            </div>


                                        </div>


                                        <div className="relative grid grid-cols-1 gap-4 items-center mt-8 sm:mt-14 text-[#202142]">

                                            <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                                <h1
                                                    className="col-span-1 font-medium text-indigo-900 dark:text-white">Username: </h1>
                                                <p id="first_name"
                                                    className="text-indigo-900 col-span-3  text-noraml "
                                                >{user?.username}
                                                </p>
                                            </div>



                                            <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                                <h1
                                                    className="col-span-1 font-medium text-indigo-900 dark:text-white">Email: </h1>
                                                <p id="first_name"
                                                    className="text-indigo-900 col-span-3 text-noraml "
                                                >{user?.email}</p>
                                            </div>

                                            <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                                <h1
                                                    className="col-span-1 font-medium text-indigo-900 dark:text-white">Phone: </h1>
                                                <p id="first_name"
                                                    className="text-indigo-900 col-span-3 text-noraml "
                                                >+91 9827 3637 76</p>
                                            </div>
                                            {user?.role === "recruiter" && <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                                <h1
                                                    className="col-span-1 font-medium text-indigo-900 dark:text-white">Role: </h1>
                                                <p id="first_name"
                                                    className="text-indigo-900 col-span-3 text-noraml capitalize"
                                                >{user?.role}</p>
                                            </div>}

                                            {user &&
                                                user?.role === "applicant" &&
                                                <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                                    <h1
                                                        className="col-span-1 font-medium text-indigo-900 dark:text-white">Skills: </h1>
                                                    <div id="first_name"
                                                        className="flex items-center gap-2 text-indigo-900 col-span-3 text-noraml "
                                                    >
                                                        {
                                                            user?.profile?.skills?.map(() =>
                                                                <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white">
                                                                    Javascript
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            }

                                            {
                                                user?.role === "applicant" &&
                                                <div className="w-full mb-2 grid grid-cols-4 gap-3 items-center">
                                                    <h1
                                                        className="col-span-1 font-medium text-indigo-900 dark:text-white">Resume: </h1>
                                                    {user?.profile?.resume ? <a href={user?.profile?.resume?.url}
                                                        target="blank" className="text-indigo-500 hover:underline text-noraml "
                                                    >Click here to get resume</a>
                                                        :
                                                        <p>NA</p>
                                                    }
                                                </div>
                                            }

                                            <div className="absolute right-2 bottom-2">
                                                <button type="submit"
                                                    onClick={() => setOpen(true)}
                                                    className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto ">Edit</button>
                                            </div>
                                        </div>
                                    </div>


                                    {
                                        open &&
                                        <div>
                                            <UpdateProfile open={open} setOpen={setOpen} />
                                        </div>
                                    }

                                    {
                                        imageOpen &&
                                        <div>
                                            <UpdateProfileImage open={imageOpen} setOpen={setImageOpen} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </main>

                    </div >


                </section>}
        </Layout>
    )
}

export default Profile


