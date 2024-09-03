/* eslint-disable react/prop-types */
import { backendApi } from '@/constant/BackendApi'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const UpdateCompanyLogo = ({ open, setOpen, job }) => {
    const [imagePreview, setImagePreview] = useState()
    const [loading, setLoading] = useState()
    const navigate = useNavigate()



    const [companyLogo, setCompanyLogo] = useState({
        logo: job?.logo?.url || null
    })

    const onchangeFileHandler = (e) => {
        setCompanyLogo({ ...companyLogo, logo: e.target.files?.[0] })
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    let axiosConfig = {
        withCredentials: true,
    }

    const updateHandler = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("logo", companyLogo.logo);
            setLoading(true)
            const { data } = await axios.put(
                `${backendApi}/job/update/image/${job?._id}`,
                formData,
                axiosConfig,
            )
            console.log(data?.user);
            if (data.success) {
                toast.success(data.message)
                navigate(`/my-job-details/${job?._id}`)
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error?.response?.data?.message)

        }
    }


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
                                    Update Company Logo
                                </DialogTitle>
                                <div className="top-0 right-0 absolute mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-b hover:bg-red-600 hover:text-white sm:mx-0 sm:h-10 sm:w-10 font-bold cursor-pointer" onClick={() => setOpen(false)}>
                                    X
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-3">

                                    <img src={imagePreview} alt="" />

                                </div>

                                <div className="mt-4 ">
                                    <label className="" >Company Logo </label>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        name='logo'
                                        onChange={onchangeFileHandler}
                                        className='w-full h-full  border outline-none my-3 py-1 px-2'
                                        placeholder=''
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

export default UpdateCompanyLogo

