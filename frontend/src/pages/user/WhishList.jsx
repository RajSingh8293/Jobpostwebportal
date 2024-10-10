import JobCard from "@/components/comp/JobCard"
import Layout from "@/components/comp/Layout"
import { Button } from "@/components/ui/button"
import { clearWishList } from "@/redux/slices/wishlistSlice"
import { MoveLeft } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const WhishList = () => {
    const dispatch = useDispatch()
    const { favorateItems } = useSelector((state) => state.whishListItems)

    return (
        <Layout>
            <section className="min-h-[100vh] py-24 lg:px-10 px-5">
                <div className="lg:max-w-full mx-auto">
                    {favorateItems?.length > 0 ?

                        <div className="w-full mx-auto">
                            <h1 className="text-center text-2xl font-bold text-gray-700" >Your Wish List Items ({favorateItems?.length})</h1>
                            <div className="pt-12 grid items-center gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">

                                {favorateItems?.map((item) =>
                                    <JobCard key={item._id} job={item} />
                                )
                                }
                            </div>

                            <div className="pt-8 ">
                                <Button variant="destructive" onClick={() => dispatch(clearWishList())}>
                                    Clear Whishlist
                                </Button>
                            </div>
                        </div>
                        :
                        <div className="py-16  flex flex-col gap-4 justify-center items-center">
                            <h1 className="text-center text-2xl font-bold text-gray-700" >Your Wish List is Empty</h1>
                            <div>
                                <img className='h-[300px]' src="/public/whishlist_img2.jpeg" alt='' />
                            </div>

                            <div className=" px-4 pb-2 ">
                                <Button className="" >
                                    <MoveLeft strokeWidth={1.5} />
                                    <Link to='/' className="ml-2">
                                        Go Back
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    }
                </div>

            </section >
        </Layout >
    )
}

export default WhishList