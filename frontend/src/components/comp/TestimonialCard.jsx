/* eslint-disable react/prop-types */
import { FaArrowRightLong } from "react-icons/fa6"
import { Button } from "../ui/button"

const TestimonialCard = ({ item }) => {
    return (
        <div className="p-2 cursor-pointer  rounded">
            <div className="flex gap-2 items-center  flex-col">
                <img className="h-10 w-10 rounded-full" src={item?.image} alt="" />
                <p className="text-sm font-bold opacity-45">{item?.name}</p>
                <p className="opacity-50 text-center  py-4">{item?.desc.slice(0, 60)}</p>
                <Button><FaArrowRightLong /></Button>
            </div>
        </div>
    )
}

export default TestimonialCard