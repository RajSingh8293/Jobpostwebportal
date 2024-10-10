import { Link, NavLink } from "react-router-dom"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useState, useEffect } from "react"
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/userSlice";
import { Heart } from "lucide-react"



const App = () => {
    const dispatch = useDispatch()
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const [showMenu, setShowMenu] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const { favorateItems: whishlistItems } = useSelector((state) => state.whishListItems)

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };


    const menuLinks = [
        {
            name: "Home",
            link: '/'
        },
        {
            name: "Jobs",
            link: '/jobs'
        },
        {
            name: "About",
            link: '/about'
        },
        {
            name: "Contact",
            link: '/contact'
        },
    ]


    const logoutHandler = async () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="fixed w-full z-20  lg:px-10 px-5 py-2 ">
            <nav className={`fixed  h-16 top-0 left-0 right-0 p-4 lg:px-10 px-5 z-30 text-gray-600 font-semibold  transition-all flex w-full justify-between items-center gap-3 duration-300 ${isScrolled ? 'bg-[#333] text-white shadow-md' : 'bg-transparent text-black'}`}>
                <div>
                    {isAuthenticated && user?.role === "recruiter" ?
                        <h1 className="text-3xl font-bold text-[tomato]">
                            <Link to='/myjobs'>LearnCode</Link>
                        </h1>
                        :
                        <h1 className="text-3xl font-bold text-[tomato]">
                            <Link to='/'>LearnCode</Link>
                        </h1>
                    }
                </div>
                <div>
                    {
                        isAuthenticated && user?.role === "recruiter" ?
                            <ul className="flex justify-center items-center gap-4">
                                <li>
                                    <NavLink to='/myjobs' className="navlink">
                                        Dasboard
                                    </NavLink>
                                </li>
                                {isAuthenticated ?
                                    <li>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Avatar className=" bg-orange-500 flex justify-center items-center">

                                                    {user && user?.profileImage?.url ? < AvatarImage className="w-8 h-8 rounded-full" src={user?.profileImage?.url} />
                                                        :
                                                        <AvatarFallback className="bg-[tomato] capitalize font-bold text-xl">{user?.username?.slice(0, 1)}</AvatarFallback>
                                                    }
                                                </Avatar>

                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="flex justify-around items-center">
                                                    <NavLink to='/profile' className="hover:underline">View Profile</NavLink>
                                                    <Button onClick={logoutHandler} variant="destructive">Logout</Button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </li>
                                    :
                                    <li>
                                        <NavLink to='/login' className="navlink">
                                            Login
                                        </NavLink>
                                    </li>
                                }
                            </ul>
                            :
                            <>
                                <ul className="hidden md:flex lg:flex justify-center items-center gap-4">
                                    {menuLinks?.map((data, index) =>
                                        <li key={index}>
                                            <NavLink to={data?.link} className="navlink">
                                                {data?.name}
                                            </NavLink>
                                        </li>
                                    )}

                                    <li>
                                        <NavLink to='/whishlist' className="relative cursor-pointer ">
                                            <Heart className="hover:text-[tomato] navlink" />

                                            <span className={`bg-[tomato] ${whishlistItems ? `block` : `hidden`}   text-xs p-0.5 px-1 rounded-full absolute -top-2 right-0`}>{whishlistItems?.length}</span>


                                        </NavLink>
                                    </li>
                                    {isAuthenticated ?
                                        <li>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Avatar className=" bg-orange-500 flex justify-center items-center">

                                                        {user && user?.profileImage?.url ? < AvatarImage className="w-8 h-8 rounded-full" src={user?.profileImage?.url} />
                                                            :
                                                            <AvatarFallback className="bg-orange-500 capitalize font-bold text-xl">{user?.username.slice(0, 1)}</AvatarFallback>
                                                        }
                                                    </Avatar>

                                                </PopoverTrigger>
                                                <PopoverContent className='w-[200px]'>
                                                    <div className="flex flex-col gap-4 ">
                                                        <NavLink to='/profile' className="hover:underline">View Profile</NavLink>
                                                        <NavLink to='/applied-jobs' className="hover:underline">Applied-jobs</NavLink>
                                                        <Button onClick={logoutHandler} variant="destructive">Logout</Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </li>
                                        :
                                        <li>
                                            <NavLink to='/login' className="navlink">
                                                Login
                                            </NavLink>
                                        </li>
                                    }

                                </ul>

                                {/* menu  */}
                                <div className="lg:hidden  md:hidden flex gap-5 items-center">
                                    <NavLink to='/whishlist' className="relative cursor-pointer ">
                                        <Heart className="hover:text-[tomato]" fontSize={25} />
                                        <span className={`bg-[tomato] ${whishlistItems ? `block` : `hidden`}   text-xs p-0.5 px-1 rounded-full absolute -top-2 right-0`}>1</span>
                                    </NavLink>

                                    <button onClick={() => setShowMenu(!showMenu)}><CiMenuFries className="hover:text-[tomato]" fontSize={25} /></button>
                                </div>
                            </>
                    }
                </div>
            </nav>

            <div className={` ${showMenu ? `block` : `hidden`} z-50`}>
                <ul className="absolute w-full h-[100vh] bg-[#333] z-50 top-0 right-0 flex flex-col  justify-center items-center gap-5">
                    {menuLinks?.map((data, index) =>
                        <li key={index} className="text-white ">
                            <NavLink to={data?.link} className="navlink">
                                {data?.name}
                            </NavLink>
                        </li>
                    )}

                    {isAuthenticated ?
                        <li className="text-white">
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className=" bg-orange-500 flex justify-center items-center">

                                        {user && user?.profileImage?.url ? < AvatarImage className="w-8 h-8 rounded-full" src={user?.profileImage?.url} />
                                            :
                                            <AvatarFallback className="bg-[tomato] capitalize font-bold text-xl">{user?.username?.slice(0, 1)}</AvatarFallback>
                                        }
                                    </Avatar>

                                </PopoverTrigger>
                                <PopoverContent className='w-[200px]'>
                                    <div className="flex  gap-4 flex-col">
                                        <NavLink to='/profile' className="hover:underline">View Profile</NavLink>
                                        <NavLink to='/applied-jobs' className="hover:underline">Applied-jobs</NavLink>
                                        <Button onClick={logoutHandler} variant="destructive">Logout</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </li>
                        :
                        <li>
                            <NavLink to='/login' className="text-white navlink">
                                Login
                            </NavLink>
                        </li>
                    }
                    <div className="absolute top-5 lg:right-10 right-5 ">
                        <button onClick={() => setShowMenu(!showMenu)} className="text-white hover:text-[tomato]">
                            <IoCloseOutline className="" fontSize={30} />
                        </button>
                    </div>

                </ul>

            </div>

        </section >
    );
};

export default App;
