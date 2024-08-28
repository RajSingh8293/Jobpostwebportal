import CategoryCarousal from "@/components/comp/CategoryCarousal"
import { IoCodeSlashOutline } from "react-icons/io5"
import Hero from "@/components/comp/Hero"
import Layout from "@/components/comp/Layout"
import JobCard from "@/components/comp/JobCard"
import NewsLetter from "@/components/comp/NewsLetter"
import TestimonialCarousal from "@/components/comp/TestimonialCarousal"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchJobs } from "@/redux/slices/JobsSlice"
import Spinner from "@/components/comp/Spinner"




const Home = () => {
    const categoryCard = [
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Web Devlopment",
            jobs: "90 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "App Devlopment",
            jobs: "15 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "IOS Devlopment",
            jobs: "170 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Android Devlopment",
            jobs: "10 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Medical",
            jobs: "20 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Restaurant",
            jobs: "17 Jobs"
        },
        {
            logo: <IoCodeSlashOutline />,
            categoryName: "Hotel",
            jobs: "7 Jobs"
        },
    ]
    const dispatch = useDispatch()
    const { jobs, loading } = useSelector((state) => state.jobs)
    // const { user } = useSelector((state) => state.auth)
    console.log("jobs :", jobs);


    useEffect(() => {
        dispatch(fetchJobs())
    }, [dispatch])
    return (
        <Layout>
            <Hero />
            <CategoryCarousal category={categoryCard} title="Jobs Categories" />

            {loading ?
                <Spinner />
                :
                <section className="px-10 py-24">
                    <h1 className="text-3xl font-bold mb-4 text-center">Recent Jobs</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {
                            jobs?.slice(0, 6).map((job, index) =>
                                <JobCard job={job} key={index} />
                            )
                        }
                    </div>
                </section>}

            <section className="">
                <div>
                    <NewsLetter />
                </div>
            </section>

            <section className="py-24 lg:px-10 px-5">
                <h1 className="text-3xl mb-4 font-bold text-center ">Our Teams</h1>
                <div className="px-10">
                    <TestimonialCarousal />
                </div>
            </section>
        </Layout>
    )
}

export default Home

