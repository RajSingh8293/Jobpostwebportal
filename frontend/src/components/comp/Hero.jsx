import { Link } from "react-router-dom"
import { Button } from "../ui/button"


const Hero = () => {

    return (
        <section className="-z-1 bg-gray-200">
            <div className="w-full relative min-h-[100vh]">
                <div className="w-full text-center min-h-[100vh] flex justify-center flex-col items-center lg:px-10 px-5 ">
                    <div>
                        <h1 className="py-4 text-center lg:text-6xl md:text-5xl sm:text-4xl text-2xl font-bold text-black">There Are <br /><span className="text-blue-600">93,178</span> Postings Here For you!</h1>
                    </div>
                    <p className="py-2  font-semibold text-sm">Find Jobs, Employment & Career Opportunities</p>
                    <p className="py-4 text-sm opacity-80"><strong>Popular searches : </strong>Designer, Developer, Web, IOS, PHP, Senior, Engineer,</p>

                    <Button className="px-5 bg-black rounded-none">
                        <Link to='/jobs'>
                            Explore more...
                        </Link>
                    </Button>
                </div>

            </div>
        </section>
    )
}

export default Hero