/* eslint-disable no-unused-vars */
import Layout from '@/components/comp/Layout'
import Sidebar from '@/components/comp/Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { createNewJob } from '@/redux/slices/myJobsSlice'
import { data } from 'autoprefixer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'



const CreateJob = () => {
    const dispatch = useDispatch()
    const [jobData, setJobData] = useState({
        title: "",
        company: "",
        minSalary: "",
        maxSalary: "",
        category: "",
        minExperience: "",
        maxExperience: "",
        location: "",
        address: "",
        companyWebsite: "",
        skills: "",
        responsibilities: "",
        description: "",
        jobRole: "",
        maxPositions: "",
        jobType: "",
    })



    const categoryArray = ["App Development", "Web Development", "Software Development", "Finance & Accounting", "Medical", "Restaurant", "Hotel"]
    const JobTypeArray = ["Full Time", "Part Time", "Parmanent", "Temparay", "Contract Base"]

    const experienceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const onchangeHandler = (e) => {
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setJobData({ ...jobData, [name]: value })


    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(jobData);
        dispatch(createNewJob(jobData))
    }

    return (
        <Layout>
            <section className="min-h-screen lg:px-10 px-5 py-24">
                <div className="bg-white w-full flex flex-col gap-5  md:flex-row text-[#161931]">
                    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                        <Sidebar />
                    </aside>
                    <main className=" w-full min-h-screen">
                        <div className=" p-2 md:p-4">
                            <div className="border-b w-full px-6 pb-8  sm:rounded-lg">
                                <h2 className="pb-4 text-2xl font-bold sm:text-xl">Create new job</h2>
                                <div className="">
                                    <form className='grid grid-cols-1 gap-4 items-center'>
                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Title</Label>
                                                <Input type="text" placeholder="Your job title" name="title" className="outline-none" value={jobData.title} onChange={onchangeHandler} />
                                            </div>
                                            <div className="">
                                                <Label>Company</Label>
                                                <Input type="text" placeholder="Your company name" name="company" className="outline-none" value={jobData.company} onChange={onchangeHandler} />
                                            </div>
                                        </div>
                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Minimum Salary</Label>
                                                <Input type="text" placeholder="Minimum salary" name="minSalary" className="outline-none" value={jobData.minSalary} onChange={onchangeHandler} />
                                            </div>
                                            <div className="">
                                                <Label>Max Salary</Label>
                                                <Input type="text" placeholder="Maximum salary" name="maxSalary" className="outline-none" value={jobData.maxSalary} onChange={onchangeHandler} />
                                            </div>
                                        </div>

                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Category</Label>
                                                <select
                                                    className='w-[100%] border py-2 px-2 text-sm text-gray-500 rounded-md'
                                                    name='category'
                                                    value={jobData?.category}
                                                    onChange={onchangeHandler}
                                                >
                                                    <option value="">Select Category</option>
                                                    {
                                                        categoryArray.map((data, index) =>
                                                            <option key={index} value={data}> {data}</option>
                                                        )}

                                                </select>

                                            </div>
                                            <div className="">
                                                <Label>Max Positions</Label>
                                                <Input type="text" placeholder="Max Positions" name="maxPositions" className="outline-none" value={jobData.maxPositions} onChange={onchangeHandler} />
                                            </div>

                                        </div>
                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Job Role</Label>
                                                <Input type="text" placeholder="Job role" name="jobRole" className="outline-none" value={jobData.jobRole} onChange={onchangeHandler} />
                                            </div>
                                            <div className="">
                                                <Label>Job Type</Label>
                                                <select
                                                    className='w-[100%] border py-2 px-2 text-sm text-gray-500 rounded-md'
                                                    name='jobType'
                                                    value={jobData?.jobType}
                                                    onChange={onchangeHandler}
                                                >
                                                    <option value="">Select Job Type</option>
                                                    {
                                                        JobTypeArray.map((data, index) =>
                                                            <option key={index} value={data}> {data}</option>
                                                        )}
                                                </select>
                                            </div>


                                        </div>

                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Location</Label>
                                                <Input type="text" placeholder="Your location" name="location" classNam="outline-none" value={jobData.location} onChange={onchangeHandler} />
                                            </div>
                                            <div className="">
                                                <Label>Address</Label>
                                                <Input type="text" placeholder="Your address" name="address" classNam="outline-none" value={jobData.address} onChange={onchangeHandler} />
                                            </div>

                                        </div>

                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Minimum Experience</Label>
                                                <select
                                                    className='w-[100%] border py-2 px-2 text-sm text-gray-500 rounded-md'
                                                    name='minExperience'
                                                    value={jobData?.minExperience}
                                                    onChange={onchangeHandler}
                                                >
                                                    <option value="">Select experience</option>
                                                    {experienceArray?.map((num, index) =>
                                                        <option className='' key={index} value={num}>{num}</option>)}
                                                </select>
                                            </div>
                                            <div className="">
                                                <Label>Maximum Experience</Label>
                                                <select
                                                    className='w-[100%] border py-2 px-2 text-sm text-gray-500 rounded-md'
                                                    name='maxExperience'
                                                    value={jobData?.maxExperience}
                                                    onChange={onchangeHandler}
                                                >
                                                    <option value="">Select experience</option>
                                                    {experienceArray?.map((num, index) =>
                                                        <option className='' key={index} value={num}>{num}</option>)}
                                                </select>
                                            </div>


                                        </div>
                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Skills</Label>
                                                <Input type="text" placeholder="Your skills" name="skills" className="outline-none" value={jobData.skills} onChange={onchangeHandler} />
                                            </div>
                                            <div className="">
                                                <Label>Responsbilities</Label>
                                                <Input type="text" placeholder="Your responsbilities" name="responsibilities" className="outline-none" value={jobData.responsibilities} onChange={onchangeHandler} />
                                            </div>
                                        </div>
                                        <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="">
                                                <Label>Description</Label>
                                                <Input type="text" placeholder="Your skills" name="description" className="outline-none" value={jobData.description} onChange={onchangeHandler} />
                                            </div>
                                            <div className="">
                                                <Label>Company Website</Label>
                                                <Input type="text" placeholder="Your company website" name="companyWebsite" className="outline-none" value={jobData.companyWebsite} onChange={onchangeHandler} />
                                            </div>
                                        </div>
                                        <div className="mb-3 grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                                            <Button type="submit" variant="destructive">
                                                <NavLink className="hover:underline" to='/myjobs'>
                                                    Go back
                                                </NavLink>
                                            </Button>
                                            <Button type="submit"
                                                onClick={submitHandler}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </div>





                            </div>
                        </div>
                    </main>

                </div >


            </section>
        </Layout>
    )
}

export default CreateJob





