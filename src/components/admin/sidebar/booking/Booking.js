import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'
import { bookingDetails, deleteBooking } from '../../../../services/Services'
function Booking() {
    const [booking, setBooking] = useState([])
    useEffect(() => {
        handleGetbooking()
    }, [])

    const handleGetbooking = async () => {
        try {
            const res = await bookingDetails()
            console.log(res.data, '---------- api booking data-----------------')
            setBooking(res.data)
        } catch (error) {
            console.log(error, "get data error")
        }

    }
    const handleDeleteClick = async (id) => {
        try {
            await deleteBooking(id)
            handleGetbooking()
        } catch (error) {
            console.log(error, "delete data error")
        }
    }
    return (
        <>
            <Table bordered striped hover responsive="md" className='m-3'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>fullname</th>
                        <th>age</th>
                        <th>bordingPoint</th>
                        <th>Mobile</th>
                        <th>email</th>
                        <th>gender</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        booking && booking.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.fullname}</td>
                                <td>{user.age}</td>
                                <td>{user.bordingPoint}</td>
                                <td>{user.mobile}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
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

export default Booking
