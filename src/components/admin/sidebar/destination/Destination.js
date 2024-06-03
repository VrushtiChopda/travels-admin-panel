import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { DeleteDestination, getDestination } from '../../../../services/Services'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { MdDeleteOutline } from 'react-icons/md'
import DestinationForm from './DestinationForm'

function Destination() {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [destination, setDestination] = useState([])
    const [packageId, setPackageId] = useState(null);
    const [updateValue, setUpdateValue] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleShow = () => {
        setShow(true);
        setEdit(false);
        setPackageId(null);
        setUpdateValue({});
    };

    const handleClose = () => setShow(false);

    useEffect(() => {
        handleGetDestination()
    }, [])
    const handleGetDestination = async () => {
        try {
            const res = await getDestination()
            console.log(res.data)
            setDestination(res.data)
        } catch (error) {
            console.log(error, "get data error")
        }

    }

    const handleEditClick = (destination) => {
        console.log(destination, "editdestination")
        setShow(true);
        setEdit(true);
        setUpdateValue(destination);
        setPackageId(destination._id);
    };

    const handleDeleteClick = async (id) => {
        try {
            await DeleteDestination(id)
            handleGetDestination()
        } catch (error) {
            console.log(error, "delete data error")
        }
    }

    return (
        <>
            <Button variant='outlined' className='m-3' style={{ border: '1px solid black' }} onClick={handleShow}>+ Add record</Button>
            <Table bordered striped hover responsive="md" className='m-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>State</th>
                        <th>Place</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        destination.map((destination, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={destination.imageUrl} alt="destination" className="img-fluid" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                <td>{destination.state}</td>
                                <td>{destination.place}</td>
                                <td className='fs-3'>
                                    <HiOutlinePencilSquare className='ms-2 cursor-pointer' onClick={() => handleEditClick(destination)} />
                                    <MdDeleteOutline className='ms-3 cursor-pointer' onClick={() => handleDeleteClick(destination._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <DestinationForm
                show={show}
                handleClose={handleClose}
                handleFileChange={handleFileChange}
                edit={edit}
                updateValue={updateValue}
                handleGetDestination={handleGetDestination}
                packageId={packageId}
            />
        </>
    )
}

export default Destination




// import React, { useEffect, useState } from 'react'
// import { Button, Table } from 'react-bootstrap'
// import { DeleteDestination, getDestination } from '../../../../services/Services'
// import { HiOutlinePencilSquare } from 'react-icons/hi2'
// import { MdDeleteOutline } from 'react-icons/md'
// import DestinationForm from './DestinationForm'

// function Destination() {
//     const [show, setShow] = useState(false);
//     const [edit, setEdit] = useState(false);
//     const [destination, setDestination] = useState([])
//     const [packageId, setPackageId] = useState(null);
//     const [updateValue, setUpdateValue] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const handleFileChange = (e) => {
//         setImageFile(e.target.files[0]);
//     };

//     const handleShow = () => {
//         setShow(true);
//         setEdit(false);
//         setPackageId(null);
//         setUpdateValue({});
//     };

//     const handleClose = () => setShow(false);

//     useEffect(() => {
//         handleGetDestination()
//     }, [])
//     const handleGetDestination = async () => {
//         try {
//             const res = await getDestination()
//             console.log(res.data)
//             setDestination(res.data)
//         } catch (error) {
//             console.log(error, "get data error")
//         }

//     }

//     const handleEditClick = (destination) => {
//         console.log(destination, "editdestination")
//         setShow(true);
//         setEdit(true);
//         setUpdateValue(destination);
//         setPackageId(destination._id);
//     };

//     const handleDeleteClick = async (id) => {
//         try {
//             await DeleteDestination(id)
//             handleGetDestination()
//         } catch (error) {
//             console.log(error, "delete data error")
//         }
//     }

//     return (
//         <>
//             <Button variant='outlined' className='m-3' style={{ border: '1px solid black' }} onClick={handleShow}>+ Add record</Button>
//             <Table border={1} striped className='m-3'>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Image</th>
//                         <th>State</th>
//                         <th>Place</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         destination.map((destination, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td><img src={destination.imageUrl} style={{ width: '50px', height: '50px' }} /></td>
//                                 <td>{destination.state}</td>
//                                 <td>{destination.place}</td>
//                                 <td className='fs-3'>
//                                     <HiOutlinePencilSquare className='ms-2 ' onClick={() => handleEditClick(destination)} />
//                                     <MdDeleteOutline className='ms-3' onClick={() => handleDeleteClick(destination._id)} />
//                                 </td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </Table>
//             <DestinationForm
//                 show={show}
//                 handleClose={handleClose}
//                 handleFileChange={handleFileChange}
//                 edit={edit}
//                 updateValue={updateValue}
//                 handleGetDestination={handleGetDestination}
//                 packageId={packageId}
//             />
//         </>
//     )
// }

// export default Destination
