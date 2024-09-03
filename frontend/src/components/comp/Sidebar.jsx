import { logoutUser } from "@/redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Sidebar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)


    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            {
                user?.role === "recruiter"
                    ?

                    <div className="sticky flex flex-col gap-2 pr-4 text-sm border-r border-indigo-100 top-12">
                        <Link to='/myjobs' className="pl-3 mb-4 text-2xl font-semibold">Dashboard</Link>

                        <Link to="/profile" className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full">
                            Profile
                        </Link>
                        <Link to="/myjobs"
                            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full">
                            My Jobs
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full ">
                            Logout
                        </button>
                    </div>
                    :
                    <div className="sticky flex flex-col gap-2 pr-4 text-sm border-r border-indigo-100 top-12">
                        <Link to='/' className="pl-3 mb-4 text-2xl font-semibold">Home</Link>
                        <Link to="/profile" className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full">
                            Profile
                        </Link>
                        <Link to="/applied-jobs"
                            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full">
                            Applied Jobs
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full ">
                            Logout
                        </button>
                    </div>
            }
        </div>
    )
}

export default Sidebar