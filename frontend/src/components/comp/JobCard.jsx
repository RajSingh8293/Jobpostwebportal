/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useState } from "react";
import ApplyJobBox from "@/pages/user/ApplyJobBox";
import { useSelector } from "react-redux";


const JobCard = ({ job }) => {
    const [open, setOpen] = useState(false)
    const saved = false
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const isApplied = job?.applications?.some(application => application?.applicant?.userId === user?._id) || false;


    return (
        <>
            <div className="">
                <div className="shadow p-4 relative">
                    <div className="flex justify-center items-center flex-col">
                        {job?.logo?.url !== "" ? <img className="w-24 h-24 rounded-full" src={job?.logo?.url} alt="" />
                            :
                            <img className="w-24 h-24 rounded-full" src="https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg" alt="" />}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 py-2">
                        <h1 className="text-[#83c0e9] text-xl">
                            <Link to={`/job/${job?._id}`}>
                                {job?.title}
                            </Link>
                        </h1>
                        <p className="font-semibold opacity-45">
                            <Link to={`/job/${job?._id}`}>
                                {job?.company}
                            </Link>
                        </p>
                        <p className=" flex items-center gap-3"><span><FaRegMoneyBillAlt /></span><span>{job?.minSalary} - {job?.maxSalary}LPA</span></p>
                    </div>

                    <div className="flex justify-between items-center">
                        <Button variant="secondary">
                            <Link to={`/job/${job?._id}`}>
                                Details
                            </Link>
                        </Button>


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

                    {
                        open &&
                        <ApplyJobBox open={open} setOpen={setOpen} id={job?._id} />
                    }



                    <p className="absolute top-4 right-4 overflow-hidden">
                        {
                            saved ? <CiHeart className="text-[red]" fontSize={30} /> : <CiHeart className="" fontSize={30} />
                        }

                    </p>
                    <p className="absolute top-4 left-4 overflow-hidden">
                        <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {job?.jobType} </span>
                    </p>
                </div>
            </div>

        </>

    )
}

export default JobCard