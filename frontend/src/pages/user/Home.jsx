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


const Home = () => {
    const dispatch = useDispatch()
    const { jobs, loading } = useSelector((state) => state.jobs)
    const [items, setItems] = useState(jobs)


    const categoryArray = ["App Development", "Web Development", "Software Development", "Finance & Accounting", "Mediacal", "Restaurant", "Hotel"]

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
            <section className="py-16">
                <Hero />
            </section>

            <section className="py-8">
                <CategoryCarousal filterData={filterData} category={categoryArray} title="Jobs Categories" />
            </section>


            {loading ?
                <Spinner />
                :
                <section className="w-full px-10  py-16">
                    <h1 className="text-3xl font-bold mb-4 text-center">Recent Jobs</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {
                            items.length === 0 ? jobs?.slice(0, 6).map((job, index) =>
                                <JobCard job={job} key={index} />
                            )
                                :
                                items?.slice(0, 6).map((job, index) =>
                                    <JobCard job={job} key={index} />
                                )
                        }
                    </div>
                </section>}

            <section className="">
                <NewsLetter />
            </section>

            <section className="py-24 lg:px-20 px-16">
                <TestimonialCarousal title="Our Teams" />
            </section>
        </Layout>
    )
}

export default Home

