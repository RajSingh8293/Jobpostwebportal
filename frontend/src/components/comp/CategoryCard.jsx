/* eslint-disable react/prop-types */
import { IoCodeSlashOutline } from "react-icons/io5"



const CategoryCard = ({ filterData, item }) => {
    // console.log("item :", item);

    return (
        <div className="cursor-pointer" onClick={() => filterData(item)}>
            <div className="flex justify-center items-center flex-col ">
                <h1 className="text-blue-500 text-2xl"><IoCodeSlashOutline /></h1>
                <h1 className="text-xl"  >{item}</h1>
                <p className="opacity-50">jobs (10)</p>
            </div>
        </div>

    )
}

export default CategoryCard