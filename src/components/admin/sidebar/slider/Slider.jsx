import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { deleteSlider, getSlider, } from '../../../../services/Services'
import { MdDeleteOutline } from 'react-icons/md'
import SliderForm from './SliderForm'

function Slider() {
    const [show, setShow] = useState(false);
    const [slider, setSlider] = useState([])
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
        handleGetSlider()
    }, [])
    const handleGetSlider = async () => {
        try {
            const res = await getSlider()
            // console.log(res.data)
            setSlider(res.data)
        } catch (error) {
            console.log(error, "get data error")
        }

    }

    const handleDeleteClick = async (id) => {
        try {
            await deleteSlider(id)
            handleGetSlider()
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
                        <th>Title</th>
                        <th>Heading</th>
                        <th>Blog</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slider && slider.map((slider, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={slider.imageUrl} alt="Slider" className="img-fluid" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                <td>{slider.title}</td>
                                <td>{slider.heading}</td>
                                <td>{slider.blog}</td>
                                <td className='fs-3'>
                                    <MdDeleteOutline className='ms-3 cursor-pointer' onClick={() => handleDeleteClick(slider._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <SliderForm
                show={show}
                handleClose={handleClose}
                handleFileChange={handleFileChange}
                updateValue={updateValue}
                handleGetSlider={handleGetSlider}
                packageId={packageId}
            />
        </>
    )
}

export default Slider