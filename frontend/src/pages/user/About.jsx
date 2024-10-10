import Layout from "@/components/comp/Layout"

const About = () => {

    return (
        <Layout>

            <section className="min-h-screen py-16">
                <div className='min-h-[300px] bg-blue-300 flex justify-center items-center'>
                    <h2
                        className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                        #about us
                    </h2>
                </div>
                <div className=" overflow-hidden bg-gray-50 pt-8 dark:bg-gray-800 md:pt-0 sm:pt-16">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid items-center grid-cols-1 md:grid-cols-2">
                            <div>
                                <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Hey I
                                    am
                                    <br className="block sm:hidden" /> Raj
                                </h2>
                                <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias expedita veniam tempore, aut necessitatibus odio vitae, quam amet ipsam assumenda nemo eius provident. Aliquid natus amet inventore voluptate earum, quasi suscipit quaerat ab commodi distinctio nostrum vero esse? In voluptas quidem inventore eum blanditiis iste quas modi ex non quasi?
                                </p>
                            </div>

                            <div className="relative">
                                <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="/about_png.png" alt="" />
                            </div>

                        </div>
                    </div>

                </div>
                <div className="pt-16 lg:px-10 px-5 max-w-[800px] mx-auto">
                    <h1 className="text-4xl font-bold">About Use</h1>
                    <div className="pt-8">

                        <h1 className="text-2xl py-3 font-semibold">Welcome to Visit Our Website</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quisquam doloribus ut eum provident maiores maxime, rerum ullam aperiam libero fugiat cumque voluptate eveniet. Voluptatibus ab debitis sed fugit impedit eveniet quis quos? Voluptatum praesentium illo tempore cumque reiciendis consequuntur ut voluptatibus est. Soluta, qui! Repellendus sequi quaerat impedit ducimus quibusdam? Veniam libero perferendis dolores mollitia minima. Ex dicta enim, doloribus libero maxime velit nisi excepturi, assumenda non modi nesciunt ducimus delectus quae deserunt adipisci.
                        </p>
                    </div>
                    <div className="pt-8">

                        <h1 className="text-2xl py-3 font-semibold">Our Vision</h1>
                        <p>
                            We envision a world where everyone has access to the job they aspire to, regardless of their background or location. We aim to bridge the gap between job seekers and employers, creating a dynamic marketplace where skills meet opportunities.
                        </p>
                    </div>
                    <div className="pt-8">

                        <h1 className="text-2xl py-3 font-semibold">What We Do</h1>
                        <p className="pt-4">
                            We offer a comprehensive platform that caters to both job seekers and employers. Our features include:
                        </p>
                        <div>
                            <ul className="styl">
                                <li className="py-4"><strong>Job Listings</strong>: A diverse range of job opportunities across various industries and experience levels, updated daily.</li>
                                <li className=""><strong>Employer Resources</strong>: Tools and insights for companies to find the right talent efficiently, including tailored recruitment solutions.</li>
                                <li className="py-4">
                                    <strong>Career Advice</strong>: A wealth of resources, including resume tips, interview guidance, and industry insights, to help job seekers navigate their career journeys.
                                </li>
                                <li className="py-4">
                                    <strong>User-Friendly Interface</strong>: Our platform is designed with ease of use in mind, ensuring a seamless experience for both job seekers and employers.
                                </li>


                            </ul>
                        </div>
                    </div>

                    <div className="pt-8">

                        <h1 className="text-2xl py-3 font-semibold">Our Team</h1>
                        <p>
                            Our team is passionate about transforming the job search process. Comprised of industry experts, tech enthusiasts, and career coaches, we bring together a wealth of knowledge and experience to support our users. We understand the challenges of the job market and are dedicated to making your search easier and more effective.
                        </p>

                    </div>
                    <div className="pt-8">

                        <h1 className="text-2xl py-3 font-semibold">Join Us</h1>
                        <p>
                            Whether you are looking for your next opportunity or seeking the perfect candidate for your team, LearCode is here to help. We invite you to explore our platform and discover the possibilities that await.
                        </p>
                        <p>
                            Thank you for choosing LearCode. Together, let us build a brighter future through meaningful employment!
                        </p>
                    </div>
                </div>

            </section>
        </Layout>
    )
}

export default About
