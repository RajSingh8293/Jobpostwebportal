import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col gap-3 justify-center items-center">

                <h1 className="text-3xl font-semibold opacity-50">Page Not Found</h1>
                <Button ><Link to='/'>Go Back To Home</Link></Button>
            </div>
        </div>
    )
}

export default PageNotFound