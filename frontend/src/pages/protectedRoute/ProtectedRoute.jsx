/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)


    useEffect(() => {
        if (user === null || user?.role !== "recruiter") {
            navigate('/')
        }
    }, [navigate, user])
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute