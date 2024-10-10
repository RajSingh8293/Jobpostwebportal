import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className=" lg:px-10 px-5 border-t border-b">

            <footer className="footer bg-base-200 text-base-content grid gap-5 lg:grid-cols-5 grid-cols-1 lg:rounded-md shadow-black lg:py-16 py-10">
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold text-[tomato]">
                        <Link to='/'>LearnCode</Link>
                    </h1>
                    <p className="py-2">
                        Providing reliable jobs since 2000
                    </p>
                    <div className="">
                        <div className="flex gap-4 justify-start items-center">
                            <h1 className="font-semibold">Follows :</h1>
                            <span className="bg-transparent border border-gray-600 hover:border-transparent p-2 rounded-full hover:bg-[tomato] "><FaFacebookF className="hover:scale-75" color="black" /></span>
                            <span className="bg-transparent border border-gray-600 hover:border-transparent p-2 rounded-full hover:bg-[tomato] "><FaTwitter className="hover:scale-75" color="black" /></span>
                            <span className="bg-transparent border border-gray-600 hover:border-transparent p-2 rounded-full hover:bg-[tomato] "><FaLinkedinIn className="hover:scale-75" color="black" /></span>
                            <span className="bg-transparent border border-gray-600 hover:border-transparent p-2 rounded-full hover:bg-[tomato] "><FaInstagram className="hover:scale-75" color="black" /></span>
                        </div>
                    </div>
                </div>
                <div className="footer w-full grid gap-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:col-span-3">
                    <div className="flex flex-col gap-3 text-gray-500">
                        <h6 className="text-xl font-bold">Services</h6>
                        <a className="link hover:underline cursor-pointer textHover">Branding</a>
                        <a className="link hover:underline cursor-pointer textHover">Design</a>
                        <a className="link hover:underline cursor-pointer textHover">Marketing</a>
                        <a className="link hover:underline cursor-pointer textHover">Advertisement</a>
                    </div>
                    <div className="flex flex-col gap-3 text-gray-500">
                        <h6 className="text-xl font-bold">Company</h6>
                        <a className="link hover:underline cursor-pointer textHover">About us</a>
                        <a className="link hover:underline cursor-pointer textHover">Contact</a>
                        <a className="link hover:underline cursor-pointer textHover">Jobs</a>
                        <a className="link hover:underline cursor-pointer textHover">Press kit</a>
                    </div>
                    <div className="flex flex-col gap-3 text-gray-500">
                        <h6 className="text-xl font-bold">Legal</h6>
                        <a className="link hover:underline cursor-pointer textHover">Terms of use</a>
                        <a className="link hover:underline cursor-pointer textHover">Privacy policy</a>
                        <a className="link hover:underline cursor-pointer textHover">Cookie policy</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer