/* eslint-disable no-unused-vars */
import Filter from "@/components/comp/Filter"
import JobCard from "@/components/comp/JobCard"
import Layout from "@/components/comp/Layout"
import { categoryFilter, cityFilter } from "@/data/filterData"
import { fetchJobs } from "@/redux/slices/JobsSlice"
import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "@/components/comp/Spinner"
import SearchBar from "@/components/comp/Search"
import CategoryAndCityFilter from "@/components/comp/CategoryAndCityFilter"



const Jobs = () => {
    const dispatch = useDispatch("")
    const { jobs, loading, totalPages, totalJobs } = useSelector((state) => state.jobs)
    const [categoryArray, setCategoryArray] = useState(categoryFilter)
    const [cityArray, setCityArray] = useState(cityFilter)
    const [city, setCity] = useState("")
    const [selectCity, setSelectCity] = useState("")
    const [category, setCategory] = useState("")
    const [selectCategory, setSelectCategory] = useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    const [currentPage, setCurrentPage] = useState(1)


    // const jobCity = jobs?.filter((data) => data.category === "Marketing & Sales")
    // const jobdata = [... new Set(jobs?.map((data) => data.experienceLevel))]
    // console.log("jobdata :", jobdata);


    const hondleCityChange = (city) => {
        setCity(city)
        setSelectCity(city)
    }

    const hondleCategoryChange = (category) => {
        setCategory(category)
        setSelectCategory(category)
    }

    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
    };

    const resetCity = () => {
        setCity("");
        setSelectCity("");
    }
    const resetCategory = () => {
        setCategory("");
        setSelectCategory("");
    }



    useEffect(() => {
        dispatch(fetchJobs(city, category, currentPage, searchKeyword))
    }, [dispatch, city, category, currentPage, searchKeyword])

    return (
        <Layout>

            <section className="lg:px-10 px-5 py-16">
                <div className=" py-8 bg-white w-full flex flex-col gap-5  md:flex-row text-[#161931]">
                    <aside className={`py-4 hidden lg:block lg:w-1/3`}>
                        <div className="p-2 flex flex-col gap-2 border-r border-indigo-100 top-12" >
                            <div className="flex flex-col gap-5">
                                <div className="">
                                    <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
                                </div>
                                <div >
                                    <Filter
                                        cityArray={cityArray}
                                        categoryArray={categoryArray}
                                        resetCity={resetCity}
                                        resetCategory={resetCategory}
                                        hondleCityChange={hondleCityChange}
                                        hondleCategoryChange={hondleCategoryChange} />
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="w-full min-h-screen py-1">
                        <div className="py-4">
                            <h1 className="text-xl font-bold opacity-50">Showing {jobs?.length} {category} jobs out of {totalJobs} </h1>
                        </div>

                        <div className="pb-4 lg:hidden ">
                            <div className=" py-4 md:w-[500px] sm:w-[500px] mx-auto">
                                <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
                            </div>
                            <CategoryAndCityFilter
                                setCity={setCity}
                                cityArray={cityArray}
                                setCategory={setCategory}
                                categoryArray={categoryArray}
                            />
                        </div>

                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 ">
                            {loading ? <Spinner /> :
                                jobs.map((job, index) =>
                                    <JobCard job={job} key={index} />
                                )
                            }
                        </div>
                    </main>
                </div >
                <div className="flex justify-center py-5">
                    <Pagination count={totalPages} onChange={setCurrentPageNo} variant="outlined" color="secondary" />
                </div>

            </section >
        </Layout >
    )
}

export default Jobs













