import { logoutUser } from "@/redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


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

                    <div className="dashboard sticky flex flex-col gap-2 pr-4 text-sm border-r border-indigo-100 top-12">
                        <NavLink to='/myjobs' className="pl-3 mb-4 text-2xl font-semibold">Dashboard</NavLink>

                        <NavLink to="/profile" className="sidbarLink flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border ">
                            Profile
                        </NavLink>
                        <NavLink to="/myjobs"
                            className="sidbarLink flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 ">
                            My Jobs
                        </NavLink>
                        <button
                            onClick={logoutHandler}
                            className="sidbarLink flex  items-center px-3 py-2.5 font-semibold hover:text-indigo-900 ">
                            Logout
                        </button>
                    </div>
                    :
                    <div className="dashboard sticky flex flex-col gap-2 pr-4 text-sm border-r border-indigo-100 top-12">
                        <NavLink to='/' className="pl-3 mb-4 text-2xl font-semibold">Home</NavLink>
                        <NavLink to="/profile" className="sidbarLink flex items-center px-3 py-2.5 font-bold  text-indigo-900 border hover:bg-gray-200">
                            Profile
                        </NavLink>
                        <NavLink to="/applied-jobs"
                            className="sidbarLink flex border hover:bg-gray-200 items-center px-3 py-2.5 font-semibold  hover:text-indigo-900">
                            Applied Jobs
                        </NavLink>
                        <button
                            onClick={logoutHandler}
                            className="sidbarLink flex border hover:bg-gray-200 items-center px-3 py-2.5 font-semibold hover:text-indigo-900 ">
                            Logout
                        </button>
                    </div>
            }
        </div>
    )
}

export default Sidebar