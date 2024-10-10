import Layout from "@/components/comp/Layout"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { LocateIcon, Phone, TimerIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const Contact = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        const userInfo = {
            access_key: "935e65c2-9a4a-4e45-886b-5d8c9b4e5e38",
            name: data.name,
            email: data.email,
            message: data.message,
        }

        try {
            const { data } = await axios.post('https://api.web3forms.com/submit', userInfo)
            if (data) {
                toast.success("Message sent successfull")
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    return (
        <Layout>
            <section className="min-h-screen pt-16 bg-blue-50">
                <div className='min-h-[300px] bg-blue-300 flex justify-center items-center'>
                    <h2
                        className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                        #contact us
                    </h2>
                </div>

                <div className=" dark:bg-slate-800  pt-5 lg:px-10 px-5 " id="contact">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className=" max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non corrupti nostrum ipsum voluptate perspiciatis sint molestiae quibusdam quos, consequatur fugiat. Et quod enim amet praesentium voluptas pariatur corrupti fugiat omnis incidunt eaque, alias vero ipsa cupiditate commodi tempora vitae excepturi animi aspernatur! Accusantium totam distinctio quod quibusdam et deleniti. Mollitia.
                            </p>
                        </div>
                        <div className="py-16">
                            <div className="grid gap-5 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                                <div className="w-full md:p-12 pr-6">
                                    <h2 className="mb-4 text-2xl font-bold dark:text-white">Get In Touch</h2>
                                    <ul className="">
                                        <li className="flex">
                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-[tomato] text-gray-50">
                                                <LocateIcon />
                                            </div>
                                            <div className="ml-4 mb-4">
                                                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address
                                                </h3>
                                                <p className="text-gray-600 dark:text-slate-400">12 Street Building A Block</p>
                                                <p className="text-gray-600 dark:text-slate-400">New Delhi, India</p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-[tomato] text-gray-50">
                                                <Phone />
                                            </div>
                                            <div className="ml-4 mb-4">
                                                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact
                                                </h3>
                                                <p className="text-gray-600 dark:text-slate-400">Mobile: +91 6377-6373 </p>
                                                <p className="text-gray-600 dark:text-slate-400">Mail: example@gmail.com</p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-[tomato] text-gray-50">
                                                <TimerIcon />
                                            </div>
                                            <div className="ml-4 mb-4">
                                                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working
                                                    hours</h3>
                                                <p className="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                                                <p className="text-gray-600 dark:text-slate-400">Saturday &amp; Sunday: 08:00 - 12:00</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full md:p-12" id="form">
                                    <h2 className="mb-4 text-2xl font-bold dark:text-white">Get Started</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-6">
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <div className="mx-0 mb-1 sm:mb-4">
                                                    <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="name" autoComplete="given-name" placeholder="Your name" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                        name="name"
                                                        {...register("name", { required: true })}
                                                    />
                                                    {errors.name && <span className="text-xs text-red-600">Name field is required</span>}
                                                </div>
                                                <div className="mx-0 mb-1 sm:mb-4">
                                                    <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label><input type="email" id="email" autoComplete="email" placeholder="Your email address" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                        name="email"
                                                        {...register("email", { required: true })}
                                                    />
                                                    {errors.email && <span className="text-xs text-red-600">Email field is required</span>}
                                                </div>
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label><textarea id="textarea" cols="30" rows="5" placeholder="Write your message..." className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                    name="message"
                                                    {...register("message", { required: true })}
                                                ></textarea>
                                                {errors.message && <span className="text-xs text-red-600">Message field is required</span>}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Button type="submit" className="w-full text-white px-6 py-3 font-xl rounded-md sm:mb-0"> {loading ? "Loading.." : "Send Message"} </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.95105788513!2d76.76355803886993!3d28.644287347036197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi%2C%20India!5e0!3m2!1sen!2sjp!4v1728130042458!5m2!1sen!2sjp" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-[450px] border"></iframe>
                </div>
            </section>
        </Layout>
    )
}

export default Contact