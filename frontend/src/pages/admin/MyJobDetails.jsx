/* eslint-disable react-hooks/exhaustive-deps */

import Layout from "@/components/comp/Layout"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UpdateCompanyLogo from "./UpdateCompanyLogo";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySingleJob } from "@/redux/slices/myJobsSlice";



const MyJobDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { mySingleJob: jobDetails } = useSelector((state) => state.myjobs)


    useEffect(() => {
        dispatch(fetchMySingleJob(id))

    }, [])

    // backColor
    return (
        <Layout>
            <section className="min-h-screen">
                <div className="w-full h-[300px] relative  ">
                    <div className="w-full  h-full opacity-50  overflow-hidden">
                        <img className="w-full" src="https://images.pexels.com/photos/442573/pexels-photo-442573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div className="px-10 absolute top-24 left-0 flex flex-col gap-5">
                        <h1 className="text-3xl font-semibold">{jobDetails?.title}</h1>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/myjobs">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Web Developer – PHP</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>


                <div className="lg:px-10 px-5 grid lg:grid-cols-6 grid-cols-1 lg:py-24 py-8 gap-5">

                    {/* left  */}
                    <div className="grid lg:col-span-4 col-span-6 ">
                        <div className="order-0 border bg-white py-10 lg:px-20 md:px-10 px-8">
                            <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Desctipion</h1>
                                <p>{jobDetails?.description}.</p>
                            </div>


                            {jobDetails?.responsibilities && <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Responsibilities</h1>
                                <ul className="list-disc flex flex-col gap-3 pl-5 pt-4">
                                    {jobDetails?.responsibilities && jobDetails?.responsibilities?.map((res, index) =>
                                        <li key={index}>
                                            {res}
                                        </li>
                                    )}
                                </ul>
                            </div>
                            }



                            <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Minimum Qualifications</h1>
                                <ul className="list-disc flex flex-col gap-3 pl-5 pt-4">
                                    <li>BA/BS degree in a technical field or equivalent practical experience..</li>
                                    <li>Programming experience in C, C++ or Java.</li>
                                    <li>Experience with AJAX, HTML and CSS.</li>
                                    <li>2 years of relevant work experience in software development..</li>
                                </ul>
                            </div>

                            <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Location</h1>
                                <div className="w-[100%] h-[300px] overflow-hidden my-2 ">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d111984.444211975!2d77.0200875597706!3d28.704184813257758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi%2C%20India!3m2!1d28.7040592!2d77.10249019999999!5e0!3m2!1sen!2sjp!4v1722473764640!5m2!1sen!2sjp" width="100%" height="100%" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                            <hr />

                            <div className="py-10">
                                <div className="flex gap-4 justify-start items-center">
                                    <h1 className="font-semibold">Share :</h1>
                                    <span><FaFacebookF /></span>
                                    <span><FaTwitter /></span>
                                    <span><FaLinkedinIn /></span>
                                    <span><FaInstagram /></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right  */}
                    <div className="w-full lg:col-span-2 col-span-6 gap-5">
                        <div className="border p-5 rounded-lg mb-10">
                            <div className="relative flex flex-col items-center gap-5">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    {jobDetails?.logo?.url !== "" ?
                                        <img className="w-full h-full" src={jobDetails?.logo?.url} alt="" />
                                        :
                                        <img src="https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg" alt="" />
                                    }
                                </div>
                                <div>
                                    <Button onClick={() => setOpen(true)}>
                                        Change Logo
                                    </Button>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="text-blue-500">Google</h1>
                                    <p className="flex gap-5"> Web Developer – PHP</p>
                                </div>
                                <span className="absolute top-2 right-2 border p-1.5 rounded-lg hover:bg-[#EF3A3A]">
                                    <CiHeart className="text-[red] hover:text-white overflow-hidden font-bold " fontSize={20} />
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4 flex-col border bg-[#F7F9FD] rounded  p-8">
                            <div className="flex flex-col ">
                                <h1 className="text-xl font-semibold">
                                    Dated Posted:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {jobDetails?.createdBy}
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Location:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    Bawana Rd Puth Khurd Delhi, 110039
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Title:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    Web Developer – PHP
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Salary:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    $12k - $20k
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Category:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    Developer
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Experience:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    2+ Years Experience
                                </h1>
                            </div>
                        </div>


                        {
                            open &&
                            <div>
                                <UpdateCompanyLogo open={open} setOpen={setOpen} job={jobDetails} />
                            </div>
                        }



                    </div>
                </div>
            </section>
        </Layout >

    )
}

export default MyJobDetails


