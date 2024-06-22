import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { MdDeleteOutline } from 'react-icons/md';
import GuideForm from './GuideForm';
import { deleteGuide, getGuide } from '../../../../services/Services';

const Guides = () => {
    const [show, setShow] = useState(false);
    const [guide, setGuide] = useState([])
    const [packageId, setPackageId] = useState(null);
    const [updateValue, setUpdateValue] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleShow = () => {
        setShow(true);
        setPackageId(null);
        setUpdateValue({});
    };

    const handleClose = () => setShow(false);

    useEffect(() => {
        handleGetguide()
    }, [])
    const handleGetguide = async () => {
        try {
            const res = await getGuide()
            console.log(res.data)
            setGuide(res.data)
        } catch (error) {
            console.log(error, "get data error")
        }

    }

    const handleDeleteClick = async (id) => {
        try {
            await deleteGuide(id)
            handleGetguide()
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
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        guide && guide.map((guide, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={guide.imageUrl} alt="guide" className="img-fluid" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                <td>{guide.name}</td>
                                <td>{guide.designation}</td>
                                <td className='fs-3'>
                                    <MdDeleteOutline className='ms-3 cursor-pointer' onClick={() => handleDeleteClick(guide._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <GuideForm
                show={show}
                handleClose={handleClose}
                handleFileChange={handleFileChange}
                updateValue={updateValue}
                handleGetguide={handleGetguide}
                packageId={packageId}
            />
        </>
    )
}

export default Guides
