import { Loader } from "lucide-react"

const Spinner = () => {
    return (
        <div className=" lg:px-10 px-5 py-16 w-full min-h-[100vh] flex justify-center items-center">
            <Loader className="mr-2 h-10 w-10 text-[tomato] animate-spin" />
        </div>
    )
}

export default Spinner