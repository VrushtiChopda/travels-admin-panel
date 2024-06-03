import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({ Component }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            let token = localStorage.getItem('token')
            // console.log(token, "tokentokentoken")
            if (!token) {
                navigate('/adminlogin')
            }
        }
        checkToken()
    }, [])

    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected
