import Layout from "@/components/comp/Layout"
import Sidebar from "@/components/comp/Sidebar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
// import { useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchApplicants } from "@/redux/slices/recruiterJobsSlice";
import { useEffect } from "react";
import { backendApi } from "@/constant/BackendApi";

const Applicants = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    // useSingleJob(id)
    const { applicants: singleJob } = useSelector((state) => state.myjobs)
    const applicantStatus = ["accepted", "processing", "rejected"]

    console.log("singleJob :", singleJob);





    const updateStatus = async (status, orderId) => {
        try {
            const { data } = await axios.put(`${backendApi}/application/${orderId}/update-status`,
                { status },
                {
                    withCredentials: true
                },
            )
            if (data.success) {
                toast.success(data.message)
                dispatch(fetchApplicants(id))
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)

        }
    }

    useEffect(() => {
        dispatch(fetchApplicants(id))
    }, [dispatch, id])

    return (
        <Layout>
            <section className="min-h-screen px-10 py-16">
                <div className="bg-white w-full flex flex-col gap-5  md:flex-row text-[#161931]">
                    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                        <Sidebar />
                    </aside>
                    <main className=" w-full min-h-screen">
                        <div className=" p-2 md:p-4">
                            <div className="border-b w-full px-6 pb-8  sm:rounded-lg">
                                <h2 className=" text-2xl font-bold sm:text-xl">My Companies</h2>
                                <div>
                                    <Table>
                                        <TableCaption>A list of your recent invoices.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="">Applicant Name</TableHead>
                                                <TableHead className="">Email</TableHead>
                                                <TableHead className="">Contact</TableHead>
                                                <TableHead className="text-right">Resume</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {singleJob?.applications?.map((job) =>
                                                <TableRow key={job?._id}>
                                                    <TableCell className="capitalize">{job?.applicant?.name
                                                    }</TableCell>
                                                    <TableCell>{job?.applicant?.email}</TableCell>
                                                    <TableCell>{job?.applicant?.phone ? job?.applicant?.phone : "965655667"} </TableCell>
                                                    <TableCell className="text-right">
                                                        <Link to={job?.applicant?.resume?.url} target="_blank">
                                                            Resume link
                                                        </Link>

                                                    </TableCell>
                                                    <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <p className="capitalize">
                                                                    {job?.status}
                                                                </p>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit"
                                                            >
                                                                {
                                                                    applicantStatus?.map((status, index) =>
                                                                        <div key={index}
                                                                            onClick={() => updateStatus(status, job._id)} className="cursor-pointer mb-2">{status}
                                                                        </div>
                                                                    )}
                                                            </PopoverContent>
                                                        </Popover>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                            </div>
                        </div>
                    </main>

                </div >


            </section>
        </Layout>
    )
}

export default Applicants



