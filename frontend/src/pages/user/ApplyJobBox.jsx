/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createApplication } from "@/redux/slices/applicationSlice"


const ApplyJobBox = ({ open, setOpen, id }) => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [applyJobData, setApplyJobData] = useState({
        name: user?.username,
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.location || "",
        resume: user?.resume || null,
    })

    const onchangeHandler = (e) => {
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setApplyJobData({ ...applyJobData, [name]: value })
    }

    const onchangeFileHandler = (e) => {
        setApplyJobData({ ...applyJobData, resume: e.target.files[0] })
    }

    const applyJobHandler = async (e) => {
        e.preventDefault()

        if (user === null) {
            navigate('/login')
        } else {
            const formData = new FormData()
            formData.append("name", applyJobData?.name)
            formData.append("email", applyJobData?.email)
            formData.append("phone", applyJobData?.phone)
            formData.append("address", applyJobData?.address)
            formData.append("resume", applyJobData?.resume)
            dispatch(createApplication(formData, id))
        }
    }
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });

    }, [dispatch])

    return (
        <>
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
                                        Upload Resume
                                    </DialogTitle>
                                    <div className="top-0 right-0 absolute mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-b hover:bg-red-600 hover:text-white sm:mx-0 sm:h-10 sm:w-10 font-bold cursor-pointer" onClick={() => setOpen(false)}>
                                        X
                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <Label>Your Name</Label>
                                            <Input type="text" placeholder="Your Name" name="name" className="outline-none" value={applyJobData.name} onChange={onchangeHandler} />
                                        </div>
                                        <div className="mb-3">
                                            <Label>Your Email</Label>
                                            <Input type="email" placeholder="Your email" name="email" className="outline-none" value={applyJobData.email} onChange={onchangeHandler} />
                                        </div>
                                        <div className="mb-3">
                                            <Label>Your Phone</Label>
                                            <Input type="number" placeholder="+91 2772 7272 22" name="phone" className="outline-none" value={applyJobData.phone} onChange={onchangeHandler} />
                                        </div>
                                        <div className="mb-3">
                                            <Label>Your Address</Label>
                                            <Input type="text" placeholder="Your adress" name="address" className="outline-none" value={applyJobData.address} onChange={onchangeHandler} />
                                        </div>

                                        <div className="mt-4 grid grid-cols-4 gap-3">
                                            <label className="" >Resume</label>
                                            <input
                                                type="file"
                                                accept='.pdf, .docx, .doc, .odt, .jpg, .jpeg'
                                                name='resume'
                                                onChange={onchangeFileHandler}
                                                // onChange={(e) => setResume(e.target.files[0])}
                                                className='w-full col-span-3 border outline-none py-1 px-2'
                                            />
                                        </div>

                                        <div className='mt-4 w-full'>
                                            <Button
                                                type="submit"
                                                onClick={applyJobHandler}
                                                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 "
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>

            </Dialog>
        </>
    )
}


export default ApplyJobBox

