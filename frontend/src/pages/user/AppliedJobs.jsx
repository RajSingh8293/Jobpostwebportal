import Layout from "@/components/comp/Layout"
import Sidebar from "@/components/comp/Sidebar"
import { getMyAppliedJobs } from "@/redux/slices/applicationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AppliedJobs = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { myAppliedJobs: applyJobApplications } = useSelector((state) => state.applications)

    useEffect(() => {
        dispatch(getMyAppliedJobs())
    }, [dispatch])


    return (
        <Layout>
            <section className="min-h-screen py-24 lg:px-10 px-5">
                <div className="bg-white  w-full flex flex-col gap-5  md:flex-row text-[#161931]">
                    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                        <Sidebar />
                    </aside>
                    <main className=" w-full min-h-screen">
                        <div className="p-2">
                            {applyJobApplications?.length > 0 ?
                                <div className="">
                                    <h1 className="text-2xl pb-5">All Jobs Applied by <span className="capitalize font-semibold">{user?.username}</span>  </h1>

                                    <div className="relative w-full overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Job ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Company name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Job Position
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Date
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    applyJobApplications?.map((appliedJob, index) =>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                <Link to={`/job/${appliedJob?.jobId?._id}`}>
                                                                    {appliedJob?.jobId?._id}
                                                                </Link>
                                                            </th>
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                <Link to={`/job/${appliedJob?.jobId?._id}`}>
                                                                    {appliedJob?.jobId?.company}
                                                                </Link>
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {appliedJob?.jobId?.jobType}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {appliedJob?.jobId?.createdAt.split("T")[0]}
                                                            </td>
                                                            <td className="px-6 py-4 font-semibold capitalize">
                                                                {appliedJob?.status}
                                                            </td>
                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                :
                                <div className="">
                                    <h1 className="text-2xl pb-5">All Jobs Applied by <span className="capitalize font-semibold">{user?.username}</span>  </h1>
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Job ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Company name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Job Position
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Date
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <div className="py-16 flex justify-center items-center">
                                                    <h1 className="text-5xl pb-5 opacity-50">You havent applied any job yet</h1>
                                                </div>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            }
                        </div>
                    </main>

                </div >

            </section >
        </Layout>
    )
}

export default AppliedJobs



