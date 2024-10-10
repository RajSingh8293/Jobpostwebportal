
import Layout from "@/components/comp/Layout"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UpdateCompanyLogo from "./UpdateCompanyLogo";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySingleJob } from "@/redux/slices/recruiterJobsSlice";
import BreadCrumb from "@/components/comp/BreadCrumb";
import { Badge } from "@/components/ui/badge";



const MyJobDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { mySingleJob: jobDetails } = useSelector((state) => state.myjobs)

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });

        dispatch(fetchMySingleJob(id))
    }, [dispatch, id])


    return (
        <Layout>
            <section className="min-h-screen">
                <div className="w-full h-[300px] relative  ">
                    <div className="w-full  h-full opacity-50  overflow-hidden">
                        <img className="w-full" src="https://images.pexels.com/photos/442573/pexels-photo-442573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div className="px-10 absolute top-24 left-0 flex flex-col gap-5">
                        <h1 className="text-3xl font-semibold">{jobDetails?.title}</h1>
                        <BreadCrumb link='/myjobs' name="Home" title={jobDetails?.title} />
                    </div>
                </div>


                <div className="lg:px-10 px-5 grid lg:grid-cols-6 grid-cols-1 lg:py-24 py-8 gap-5">

                    {/* left  */}
                    <div className="grid lg:col-span-4 col-span-6 ">
                        <div className="order-0 border bg-white py-10 lg:px-20 md:px-10 px-8">
                            {jobDetails?.description && <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Desctipion</h1>
                                <p>{jobDetails?.description}.</p>
                            </div>}


                            <div className="pb-10">
                                <h1 className="py-3 text-3xl font-bold">Required Skills</h1>
                                <div className="list-disc flex gap-3  pt-4">
                                    {jobDetails?.skills?.map((res, index) =>
                                        res && <p key={index} >
                                            <Badge >{res}</Badge>
                                        </p>
                                    )}
                                </div>
                            </div>



                            <div className="pb-10">
                                <div className="list-disc flex flex-col gap-3 pt-4">
                                    <div> <strong>Role </strong> : {jobDetails?.jobRole}</div>
                                    <div> <strong>Industry Type </strong> : {jobDetails?.company}</div>
                                    <div> <strong>Department </strong> : {jobDetails?.category}</div>
                                    <div> <strong>Employment Type </strong> : {jobDetails?.jobType}</div>
                                    <div> <strong>Role Category </strong> : {jobDetails?.category}</div>
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
                        <div className="border p-5 rounded-lg mb-10">
                            <div className="relative flex flex-col items-center gap-5">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    {jobDetails?.logo?.url !== "" ?
                                        <img className="w-full h-full" src={jobDetails?.logo?.url} alt="" />
                                        :
                                        <img className="w-24 h-24 rounded-full" src='/public/job_card_img.jpg' alt="" />
                                    }
                                </div>
                                <div>
                                    <Button onClick={() => setOpen(true)}>
                                        Change Logo
                                    </Button>
                                </div>
                                {jobDetails.company && <div className="flex flex-col justify-center items-center">
                                    <h1 className="text-blue-500">{jobDetails?.company}</h1>
                                    <p className="flex gap-5">{jobDetails?.title}</p>
                                </div>}
                            </div>
                        </div>
                        <div className="flex gap-4 flex-col border bg-[#F7F9FD] rounded  p-8">
                            <div className="flex flex-col ">
                                <h1 className="text-xl font-semibold">
                                    Dated Posted:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {jobDetails?.createdAt?.split("T")[0]}
                                </h1>
                            </div>
                            {jobDetails?.location && <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Location:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {jobDetails?.location}
                                </h1>
                            </div>}
                            {jobDetails?.title && <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Title:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {jobDetails?.title}
                                </h1>
                            </div>}
                            < div className="flex flex-col">
                                <h1 className="text-xl font-semibold">
                                    Salary:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {jobDetails?.salary ? `${jobDetails?.salary / 100000}LPA` : "Not disclosed"}
                                </h1>
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-xl font-semibold">
                                    Category:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {jobDetails?.category}
                                </h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-semibold">
                                    Experience:
                                </h1>
                                <h1 className="text-normal opacity-50">
                                    {jobDetails?.experienceLevel} Experience
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


