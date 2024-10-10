/* eslint-disable no-unused-vars */
import CategoryCarousal from "@/components/comp/CategoryCarousal"
import Hero from "@/components/comp/Hero"
import Layout from "@/components/comp/Layout"
import JobCard from "@/components/comp/JobCard"
import NewsLetter from "@/components/comp/NewsLetter"
import TestimonialCarousal from "@/components/comp/TestimonialCarousal"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchJobs } from "@/redux/slices/JobsSlice"
import Spinner from "@/components/comp/Spinner"
import { categoryFilter } from "@/data/filterData"
import Title from "@/components/comp/Title"


const Home = () => {
    const dispatch = useDispatch()
    const { jobs, loading } = useSelector((state) => state.jobs)
    const [items, setItems] = useState(jobs)
    const [categoryArray, setCategoryArray] = useState(categoryFilter)


    console.log("jobs :", jobs);

    const filterData = (category) => {
        const updateData = jobs.filter((item) => {
            return item?.category === category
        })
        setItems(updateData)
    }

    useEffect(() => {
        dispatch(fetchJobs())
    }, [dispatch])
    return (
        <Layout>
            <section className="pt-16">
                <Hero />
            </section>

            <section className="py-8 lg:px-10 px-5 ">
                <Title title="Jobs Categories" />
                <div className="px-10">
                    <CategoryCarousal filterData={filterData} category={categoryArray} />
                </div>
            </section>



            {loading ?

                <Spinner />
                :
                <section className="w-full lg:px-10 px-5  lg:py-16">
                    <Title title="Recent Jobs" />
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {
                            items.length === 0 ?
                                jobs?.map((job, index) =>
                                    <JobCard job={job} key={index} />
                                )
                                :
                                items?.map((job, index) =>
                                    <JobCard job={job} key={index} />
                                )
                        }
                    </div>
                </section>}

            <section className="py-16">
                <NewsLetter />
            </section>

            <section className="py-16 lg:px-10 px-5 ">
                <Title title="Our Teams" />
                <div className="lg:px-20 px-10">
                    <TestimonialCarousal />
                </div>
            </section>
        </Layout>
    )
}

export default Home

