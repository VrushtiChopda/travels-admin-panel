import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { DeleteuserDetail, getUsers } from '../../../../services/Services'
import { MdDeleteOutline } from 'react-icons/md'

function UserDetails() {
    const [userDetail, setuserDetail] = useState([])
    useEffect(() => {
        handleGetuserDetail()
    }, [])

    const handleGetuserDetail = async () => {
        try {
            const res = await getUsers()
            setuserDetail(res.data)
        } catch (error) {
            console.log(error, "get data error")
        }

    }
    const handleDeleteClick = async (id) => {
        try {
            await DeleteuserDetail(id)
            handleGetuserDetail()
        } catch (error) {
            console.log(error, "delete data error")
        }
    }
    return (
        <>
            <Table bordered striped hover responsive="md" className='m-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>OTP</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userDetail && userDetail.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.OTP}</td>
                                <td className='fs-3'>
                                    <MdDeleteOutline className='ms-3 cursor-pointer' onClick={() => handleDeleteClick(user._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default UserDetails
