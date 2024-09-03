import JobCard from "@/components/comp/JobCard"
import Layout from "@/components/comp/Layout"
import { Label } from "@/components/ui/label"
import { fetchJobs } from "@/redux/slices/JobsSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Jobs = () => {
    const dispatch = useDispatch("")
    const [city, setCity] = useState("")
    const [selectCity, setSelectCity] = useState("")
    const [category, setCategory] = useState("")
    const [selectCategory, setSelectCategory] = useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    const { jobs } = useSelector((state) => state.jobs)



    const hondleCityChange = (city) => {
        setCity(city)
        setSelectCity(city)
    }
    const hondleCategoryChange = (category) => {
        setCategory(category)
        setSelectCategory(category)
    }


    useEffect(() => {
        dispatch(fetchJobs(city, category, searchKeyword))
    }, [dispatch, city, category, searchKeyword])

    const handleSearch = () => {
        dispatch(fetchJobs(city, category, searchKeyword))
    }



    useEffect(() => {
        dispatch(fetchJobs())
    }, [dispatch])




    const cityArray = ["Delhi", "Mumbai", "Jaipur", "Bengaluru", "Fridabad", "Gurugram", "Chennai"]
    const categoryArray = ["App Development", "Web Development", "Finance & Accounting", "Medical", "Restaurant", "Hotel"]



    return (
        <Layout>

            <section className="lg:px-10 px-5 py-16">
                <div className="py-8 bg-white w-full flex flex-col gap-5  md:flex-row text-[#161931]">
                    <aside className="hidden  py-4 md:w-1/3 lg:w-1/3 md:block">
                        <div className="sticky p-2 flex flex-col gap-2 border-r border-indigo-100 top-12" >
                            <div>
                                {/* <RadioGroup defaultValue="comfortable">
                                    {filterData.map((data, index) =>
                                        <div key={index}>
                                            <h1 className="my-3 text-xl font-semibold">{data.name}</h1>
                                            <div className="flex gap-3 flex-col ">

                                                {data.deatails.map((data, ind) =>
                                                    <div key={ind} className="flex gap-2 items-center space-x-2">
                                                        <RadioGroupItem value={data} id="option-one" />
                                                        <Label htmlFor="option-one">{data}</Label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </RadioGroup> */}



                                <div >
                                    <h1 className="my-3 text-xl font-semibold">Filter By City</h1>
                                    <div className="flex gap-3 flex-col ">
                                        {cityArray.map((city, index) =>
                                            <div key={index} className="flex gap-2 items-center space-x-2">
                                                <input type="radio" id={city} name="city" value={city} checked={selectCity == city} onChange={() => hondleCityChange(city)} />
                                                <Label htmlFor={city}>{city}</Label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div >
                                    <h1 className="my-3 text-xl font-semibold">Filter By Category</h1>
                                    <div className="flex gap-3 flex-col ">
                                        {categoryArray?.map((category, index) =>
                                            <div key={index} className="flex gap-2 items-center space-x-2">
                                                <input className="" type="radio" id={category} name="category" value={category} checked={selectCategory == category} onChange={() => hondleCategoryChange(category)} />
                                                <Label htmlFor={category}>{category}</Label>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="w-full min-h-screen py-1">

                        <div className="">
                            <h1 className="text-2xl lg:text-center font-bold opacity-50">Total {jobs?.length} jobs</h1>
                        </div>

                        <div className="flex gap-4 items-center justify-end py-4">
                            <div className="mobile-filter lg:hidden md:hidden " >
                                <div className="flex gap-3 flex-col">
                                    <select onChange={(e) => setCity(e.target.value)} className="flex gap-2 items-center border space-x-2 p-2">
                                        <option value="">Filter By City</option>
                                        {cityArray.map((city, index) =>
                                            <option className="p-2" value={city} key={index}>
                                                {city}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="mobile-filter lg:hidden md:hidden " >
                                <div className="flex gap-3 ">
                                    <select onChange={(e) => setCategory(e.target.value)} className="flex gap-2 items-center border space-x-2  p-2">
                                        <option value="">Filter By Category</option>
                                        {categoryArray.map((category, index) =>
                                            <option className=" p-2" value={category} key={index}>
                                                {category}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="lg:flex justify-center">

                            <div className="border-2 mb-10  lg:w-[70%] flex justify-between p-1 border-black rounded overflow-hidden ">
                                <input
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)} className=" px-2 w-full outline-none" type="search" placeholder="Filter by name" />
                                <button onClick={handleSearch} className="text-white px-4 py-1 bg-black hover:bg-[#302d2d]" >Search</button>
                            </div>
                        </div>

                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
                            {
                                jobs.map((job, index) =>
                                    <JobCard job={job} key={index} />
                                )
                            }
                        </div>
                    </main>
                </div>

            </section>
        </Layout>
    )
}

export default Jobs


