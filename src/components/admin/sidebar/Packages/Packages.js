import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import PackageForm from './PackageForm';
import { deletePackage } from '../../../../services/Services';

function Packages() {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [pack, setPack] = useState([]);
    const [packageId, setPackageId] = useState(null);
    const [updateValue, setUpdateValue] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleShow = () => {
        setShow(true);
        setEdit(false);
        setPackageId(null);
        setUpdateValue({});
    };

    const handleClose = () => setShow(false);

    useEffect(() => {
        data();
    }, []);

    const data = async () => {
        try {
            const res = await axios.get('http://localhost:2000/api/package/getPackage');
            setPack(res.data);
        } catch (error) {
            console.error("fetching error = ", error);
        }
    };

    const handleEditClick = (record) => {
        setShow(true);
        setEdit(true);
        setUpdateValue(record);
        setPackageId(record._id);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await deletePackage(id);
                data();  // Refresh the data after successful deletion
            } catch (error) {
                console.error("Error deleting package:", error);
            }
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <>
            <Button variant='outlined' className='m-3' style={{ border: '1px solid black' }} onClick={handleShow}>+ Add Record</Button>
            <Table striped bordered hover responsive="lg" className='m-3'>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>IMAGE</th>
                        <th>NAME</th>
                        <th>DESTINATION</th>
                        <th>DURATION</th>
                        <th>DAY</th>
                        <th>MAX PEOPLE</th>
                        <th>MIN AGE</th>
                        <th>DATE</th>
                        <th>PRICE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {pack.map((pack, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={pack.imageUrl} alt={pack.name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{pack.name}</td>
                            <td>{pack.destination}</td>
                            <td>{pack.duration}</td>
                            <td>{pack.day}</td>
                            <td>{pack.maxPeople}</td>
                            <td>{pack.minAge}</td>
                            <td>{pack.date}</td>
                            <td>{pack.price}</td>
                            <td className='fs-3'>
                                <HiOutlinePencilSquare className='ms-2 cursor-pointer' onClick={() => handleEditClick(pack)} />
                                <MdDeleteOutline className='ms-3 cursor-pointer' onClick={() => handleDeleteClick(pack._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <PackageForm
                show={show}
                handleClose={handleClose}
                handleFileChange={handleFileChange}
                edit={edit}
                updateValue={updateValue}
                data={data}
                packageId={packageId}
            />
        </>
    );
}

export default Packages;


// import React, { useState, useEffect } from 'react';
// import { Button, Table } from 'react-bootstrap';
// import { HiOutlinePencilSquare } from "react-icons/hi2";
// import { MdDeleteOutline } from "react-icons/md";
// import axios from 'axios';
// import PackageForm from './PackageForm';
// import { deletePackage } from '../../../../services/Services';

// function Packages() {
//     const [show, setShow] = useState(false);
//     const handleShow = () => {
//         setShow(true);
//         setEdit(false);
//         setPackageId(null);
//         setUpdateValue({});
//     };
//     const handleClose = () => setShow(false);
//     const [edit, setEdit] = useState(false);
//     const [pack, setPack] = useState([]);
//     const [packageId, setPackageId] = useState(null);
//     const [updateValue, setUpdateValue] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     useEffect(() => {
//         data();
//     }, []);

//     const data = async () => {
//         try {
//             const res = await axios.get('http://localhost:2000/api/package/getPackage');
//             setPack(res.data);
//         } catch (error) {
//             console.error("fetching error = = ", error);
//         }
//     };

//     const handleEditClick = (record) => {
//         setShow(true);
//         setEdit(true);
//         setUpdateValue(record);
//         setPackageId(record._id)

//     };

//     const handleDeleteClick = async (id) => {
//         const res = await deletePackage(id)
//         alert("are you sure you want to delete this package ?")
//     }
//     const handleFileChange = (e) => {
//         setImageFile(e.target.files[0]);
//     };

//     return (
//         <>
//             <Button variant='outlined' className='m-3' style={{ border: '1px solid black' }} onClick={handleShow}>+ Add Record</Button>
//             <Table striped bordered hover className='m-3'>
//                 <thead>
//                     <tr>
//                         <th>NO</th>
//                         <th>IMAGE</th>
//                         <th>NAME</th>
//                         <th>DESTINATION</th>
//                         <th>DURATION</th>
//                         <th>DAY</th>
//                         <th>MAX PEOPLE</th>
//                         <th>MIN AGE</th>
//                         <th>DATE</th>
//                         <th>PRICE</th>
//                         <th>ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {pack.map((pack, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td><img src={pack.imageUrl} alt={pack.name} style={{ width: '50px', height: '50px' }} /></td>
//                             <td>{pack.name}</td>
//                             <td>{pack.destination}</td>
//                             <td>{pack.duration}</td>
//                             <td>{pack.day}</td>
//                             <td>{pack.maxPeople}</td>
//                             <td>{pack.minAge}</td>
//                             <td>{pack.date}</td>
//                             <td>{pack.price}</td>
//                             <td className='fs-3'>
//                                 <HiOutlinePencilSquare className='ms-2 ' onClick={() => handleEditClick(pack)} />
//                                 <MdDeleteOutline className='ms-3' onClick={() => handleDeleteClick(pack._id)} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>

//             </Table>
//             <PackageForm
//                 show={show}
//                 handleClose={handleClose}
//                 handleFileChange={handleFileChange}
//                 edit={edit}
//                 updateValue={updateValue}
//                 data={data}
//                 packageId={packageId}
//             />
//         </>
//     );
// }

// export default Packages;
