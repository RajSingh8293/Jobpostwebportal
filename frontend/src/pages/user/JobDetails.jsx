/* eslint-disable react-hooks/exhaustive-deps */


import JobCard from "@/components/comp/JobCard";
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
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ApplyJobBox from "./ApplyJobBox";
import { fetchJobs, fetchSingleJob } from "@/redux/slices/JobsSlice";
import { addTowhistList, removeFromWhishList } from "@/redux/slices/wishlistSlice";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";



const JobDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [relatedJobs, setRelatedJobs] = useState([])

    const { favorateItems } = useSelector((state) => state.whishListItems)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const { singleJob: job, jobs } = useSelector((state) => state.jobs)
    const isApplied = job?.applications?.some(application => application?.applicant?.userId === user?._id) || false;

    const whishlsit = favorateItems?.find((item) => item._id === job._id)

    const addToWishList = (id) => {
        dispatch(addTowhistList(id))
    }
    const removeToWishList = (id) => {
        dispatch(removeFromWhishList(id))
    }

    useEffect(() => {
        dispatch(fetchSingleJob(id))
    }, [dispatch, id])
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });

    }, [dispatch])

    useEffect(() => {
        dispatch(fetchJobs())
        const relatedProduct =
            jobs && jobs?.filter((item) => item?.category == job?.category)
        setRelatedJobs(relatedProduct)

    }, [dispatch, job])
    return (
        <Layout>
            <section className="min-h-screen pt-16">
                <div className="relative lg:h-[300px] md:h-[300px] sm:h-[300px] ">
                    <div className="h-full  w-[100%] opacity-50  overflow-hidden">
                        <img className="w-full" src="https://images.pexels.com/photos/442573/pexels-photo-442573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>

                    <div className="absolute lg:top-24 top-16 lg:px-10 px-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-3xl font-semibold">{job?.title}</h1>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/job/${job?._id}`}>Job Datils</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{job?.title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        <div className="lg:hidden md:hidden sm:hidden ">
                            {isAuthenticated && user !== null ?
                                <div className="">
                                    {isApplied ?
                                        <Button className="opacity-50" disabled>Already Applied!</Button>
                                        :
                                        <Button onClick={() => setOpen(true)} >Apply</Button>
                                    }
                                </div>
                                :
                                <div className="">
                                    <Button >
                                        <Link className="" to='/login'>Login To Apply</Link>
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="hidden lg:block md:block sm:block lg:px-10 px-5 absolute top-24 right-0">
                        {isAuthenticated && user !== null ?
                            <div className="">
                                {isApplied ?
                                    <Button className="opacity-50" disabled>Already Applied!</Button>
                                    :
                                    <Button onClick={() => setOpen(true)} >Apply</Button>
                                }
                            </div>
                            :
                            <div className="">
                                <Button >
                                    <Link className="" to='/login'>Login To Apply</Link>
                                </Button>
                            </div>
                        }
                    </div>
                </div>

                <div className="lg:px-10 px-5 grid lg:grid-cols-6 grid-cols-1 lg:py-24 py-8 gap-5">
                    {/* left  */}
                    <div className="grid lg:col-span-4  col-span-6 ">

                        <div className="order-0 border bg-white py-10 lg:px-20 md:px-10 px-5">
                            <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Desctipion</h1>
                                <p>{job?.description}.</p>
                            </div>

                            <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Required Skills</h1>
                                <div className="list-disc flex gap-3  pt-4">
                                    {job?.skills?.map((res, index) =>
                                        res && <p key={index} >
                                            <Badge >{res}</Badge>
                                        </p>
                                    )}
                                </div>
                            </div>



                            <div className="pb-10">
                                <div className="list-disc flex flex-col gap-3 pt-4">
                                    <div> <strong>Role </strong> : {job?.jobRole}</div>
                                    <div> <strong>Industry Type </strong> : {job?.company}</div>
                                    <div> <strong>Department </strong> : {job?.category}</div>
                                    <div> <strong>Employment Type </strong> : {job?.jobType}</div>
                                    <div> <strong>Role Category </strong> : {job?.category}</div>
                                </div>
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
                        <div className="flex gap-4 flex-col border bg-[#F7F9FD] rounded  lg:p-8 p-4">
                            <div className="flex flex-col ">
                                <h1 className="text-xl font-semibold">
                                    Dated Posted:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {job?.createdAt?.split("T")[0]}
                                </h1>
                            </div>
                            <div className="flex flex-col ">
                                <h1 className="text-xl font-semibold">
                                    Company:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {job?.company}
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Location:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {job?.location}
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Adress:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {job?.address}
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Title:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {job?.title}
                                </h1>
                            </div>
                            < div className="flex flex-col">
                                <h1 className="text-xl font-semibold">
                                    Salary:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    <span>
                                        {job?.salary ? `${job?.salary / 100000} LPA` : "Not disclosed"}
                                    </span>
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Category:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {job?.category}
                                </h1>
                            </div>
                            {job?.experienceLevel && <div className="flex flex-col">
                                <h1 className="text-xl font-semibold">
                                    Experience:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {job?.experienceLevel} experience
                                </h1>
                            </div>}
                            <div className="py-8 flex flex-col">
                                <span className="py-2">Before apply this job you have to login first</span>
                                {user && user !== null ?
                                    <div className="">
                                        {isApplied ?
                                            <Button className="opacity-50" disabled>Already Applied!</Button>
                                            :
                                            <Button onClick={() => setOpen(true)} >Apply</Button>
                                        }
                                    </div>
                                    :
                                    <div className=" flex flex-col lg:flex md:flex gap-4">
                                        <Button >
                                            <Link className="" to='/register'>Register To Apply</Link>
                                        </Button>

                                        <Button >
                                            <Link className="" to='/login'>Login To Apply</Link>
                                        </Button>
                                    </div>
                                }
                            </div>

                        </div>

                        <div className="border p-5 rounded-lg mt-10">
                            <div className="relative flex flex-col items-center gap-5">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    {job && job?.logo?.url ? <img src={job?.logo?.url} alt="" />
                                        :
                                        <img src='/public/job_card_img.jpg' alt="" />}
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="text-blue-500">{job?.company}</h1>
                                    <p className="flex gap-5"> {job?.title}</p>
                                </div>
                                {whishlsit ?
                                    <span className={`absolute bg-[#EF3A3A] text-white top-2 right-2 border p-1.5 rounded-lg hover:bg-[#EF3A3A] `}>
                                        <Heart onClick={() => removeToWishList(job)} className="  hover:text-white overflow-hidden font-bold " size={20} />
                                    </span>
                                    :
                                    <span className="absolute hover:bg-[#EF3A3A] hover:text-white top-2 right-2 border p-1.5 rounded-lg hover:bg-[#EF3A3A">
                                        <Heart onClick={() => addToWishList(job)} className="  overflow-hidden font-bold " size={20} />
                                    </span>
                                }
                            </div>
                        </div>

                        {
                            open &&
                            <div>
                                <ApplyJobBox open={open} setOpen={setOpen} id={id} />
                            </div>
                        }

                    </div>
                </div>

                <div className="lg:px-10 px-5 py-10">
                    <div className="">
                        <h1 className="pb-10 font-bold text-3xl">Related Jobs</h1>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                            {relatedJobs &&
                                relatedJobs?.slice(0, 6).map((job, index) =>
                                    <JobCard job={job} key={index} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Layout >

    )
}

export default JobDetails


