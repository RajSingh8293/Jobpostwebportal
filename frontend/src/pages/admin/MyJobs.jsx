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
import { CiUser } from "react-icons/ci"
import { IoTrashOutline } from "react-icons/io5"
import { Link, NavLink } from "react-router-dom"
// import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useEffect, useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
// import useRecruiterJobs from "@/hooks/useRecruiterJobs"
import { toast } from "react-toastify"
import axios from "axios"
import { fetchAllMyJobs } from "@/redux/slices/recruiterJobsSlice"
import { backendApi } from "@/constant/BackendApi"
import { MoreHorizontal } from "lucide-react"
import { Pagination } from "@mui/material"

const MyJobs = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const { myjobs, totalJobs, totalPages } = useSelector((state) => state.myjobs)

    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
    };
    const deleteMyJob = async (jobId) => {
        try {
            const { data } = await axios.delete(`${backendApi}/job/delete/${jobId}`,
                {
                    withCredentials: true,
                },
            )
            if (data.success) {
                toast.success(data?.message)
                dispatch(fetchAllMyJobs())
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
        dispatch(fetchAllMyJobs(currentPage))
    }, [dispatch, currentPage])

    return (
        <Layout>
            <section className="min-h-screen lg:px-10 px-5 py-24">
                <div className="bg-white w-full flex flex-col gap-5  md:flex-row text-[#161931]">
                    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                        <Sidebar />
                    </aside>
                    <main className=" w-full min-h-screen">
                        <div className="w-full  md:p-4">
                            <div className="border-b  sm:rounded-lg">
                                <div className="pb-5 flex justify-between items-center">
                                    <h2 className="text-2xl font-bold sm:text-xl">Showing {myjobs?.length} of {totalJobs}</h2>
                                    <Button><Link to='/create-job'>Create New Job</Link></Button>
                                </div>
                                <hr />
                                <div>
                                    <Table>
                                        <TableCaption>A list of your recent invoices.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="">Id</TableHead>
                                                <TableHead className="">Company Name</TableHead>
                                                <TableHead className="">Title</TableHead>
                                                <TableHead className="text-right">Positions</TableHead>
                                                <TableHead className="text-right">Applicants</TableHead>
                                                <TableHead>Created Date</TableHead>
                                                <TableHead>Operations</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {myjobs && myjobs?.map((job) =>
                                                <TableRow key={job?._id}>
                                                    <TableCell className="font-medium">
                                                        <div className="hover:underline rounded-full overflow-hidden">
                                                            {job?.logo?.url !== ""
                                                                ?
                                                                < img className="bg-gray-300 w-8 h-8 rounded-full" src={job?.logo?.url} alt="" />
                                                                :
                                                                < img className="bg-gray-300  w-8 h-8 rounded-full" src="https://png.pngtree.com/element_our/20190531/ourmid/pngtree-real-shot-of-office-building--png-free-image_1298440.jpg" alt="" />
                                                            }
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <NavLink to={`/my-job-details/${job?._id}`} className="hover:underline">
                                                            {job?.company}
                                                        </NavLink>
                                                    </TableCell>
                                                    <TableCell>{job?.jobType}</TableCell>
                                                    <TableCell className="text-right">
                                                        {job?.maxPositions}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {job?.applications.length}
                                                    </TableCell>
                                                    <TableCell className="">{job?.createdAt
                                                        .split("T")[0]}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <MoreHorizontal className='text-xl' />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit"
                                                            >
                                                                <div>
                                                                    <button className="flex gap-3  px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900" onClick={() => deleteMyJob(job?._id)} > <span><IoTrashOutline className="hover:text-[red] text-xl  " /></span> <span>Delete</span> </button>
                                                                </div>
                                                                <div>
                                                                    <NavLink to={`/job-applicants/${job?._id}`} className="flex gap-3 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"  ><span>
                                                                        <CiUser className="hover:text-[red] text-xl " /></span> <span>Applicants</span></NavLink>
                                                                </div>
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
                        <div className="flex justify-center py-5">
                            <Pagination count={totalPages} onChange={setCurrentPageNo} variant="outlined" color="secondary" />
                        </div>
                    </main>

                </div >


            </section>
        </Layout>
    )
}

export default MyJobs






