/* eslint-disable react/prop-types */

const CategoryAndCityFilter = ({ setCity, cityArray, setCategory, categoryArray }) => {
    return (
        <div className="mobile-filter lg:hidden flex gap-5 justify-between" >
            <div className="w-full">
                <select onChange={(e) => setCity(e.target.value)} className="w-full flex gap-2 items-center border space-x-2 p-2">
                    <option value="">All City</option>
                    {cityArray.map((city, index) =>
                        <option className="p-2" value={city} key={index}>
                            {city}
                        </option>
                    )}
                </select>
            </div>
            <div className="w-full">
                <select onChange={(e) => setCategory(e.target.value)} className=" w-full flex gap-2 items-center border space-x-2  p-2">
                    <option value="">All Category</option>
                    {categoryArray.map((category, index) =>
                        <option className=" p-2" value={category} key={index}>
                            {category}
                        </option>
                    )}
                </select>
            </div>
        </div>
    )
}

export default CategoryAndCityFilter