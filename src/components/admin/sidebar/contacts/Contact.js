import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'
import { deleteContact, getContact } from '../../../../services/Services'
function Contact() {
    const [contact, setcontact] = useState([])
    useEffect(() => {
        handleGetcontact()
    }, [])

    const handleGetcontact = async () => {
        try {
            const res = await getContact()
            console.log(res.data, '---------- api contact data-----------------')
            setcontact(res.data)
        } catch (error) {
            console.log(error, "get data error")
        }

    }
    const handleDeleteClick = async (id) => {
        try {
            await deleteContact(id)
            handleGetcontact()
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
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contact && contact.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.message}</td>
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

export default Contact
