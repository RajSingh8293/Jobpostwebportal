/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const UserProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state) => state.auth)


    useEffect(() => {
        if (user === null || !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate, user])
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedRoute