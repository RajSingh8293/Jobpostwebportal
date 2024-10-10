/* eslint-disable react/prop-types */

import { Search } from "lucide-react"


const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
    return (
        <div className="border  lg:w-[70%] flex justify-between p-1 rounded overflow-hidden ">
            <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className=" px-2 w-full outline-none"
                type="text" placeholder="Search..." />
            <button className="px-2" >
                <Search size={20} />
            </button>
        </div>
    )
}

export default SearchBar