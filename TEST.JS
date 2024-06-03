import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { MdDeleteOutline } from 'react-icons/md'
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
const UpdatePackage = () => {
    const [show, setShow] = useState(false);
    const [records, setRecords] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    //set value
    const [updateValue, setUpdateValue] = useState({})

    const handleShow = (record) => {
        setUpdateValue(record)
        setShow(true);
    }
    const handleClose = () => setShow(false);
    const getPackages = async () => {
        try {
            const response = await axios.get('http://localhost:2000/api/package/getPackage');
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    useEffect(() => {
        getPackages();
    }, []);
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        destination: Yup.string().required('Required'),
        duration: Yup.string().required('Required'),
        day: Yup.string().required('Required'),
        maxPeople: Yup.number().required('Required').min(1, 'Must be at least 1'),
        minAge: Yup.number().required('Required').min(0, 'Must be at least 0'),
        date: Yup.date().required('Required'),
        price: Yup.number().required('Required').min(0, 'Must be at least 0')
    });
    const handleUpdatePackage = async (values) => {
        try {
            const res = await axios.put(`http://localhost:2000/api/package/updatePackage/${id}`, values)
            console.log(res.data, 'update package')
            handleClose()
            getPackages()
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <Table striped bordered hover className='m-3'>
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
                    {
                        records && records.map((record, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={record.imageUrl} alt={record.name} style={{ width: '50px', height: '50px' }} /></td>
                                <td>{record.name}</td>
                                <td>{record.destination}</td>
                                <td>{record.duration}</td>
                                <td>{record.day}</td>
                                <td>{record.maxPeople}</td>
                                <td>{record.minAge}</td>
                                <td>{record.date}</td>
                                <td>{record.price}</td>
                                <td className='fs-3'>
                                    <HiOutlinePencilSquare className='ms-2 ' onClick={handleShow} />
                                    <MdDeleteOutline className='ms-3' />
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: updateValue.name || '',
                            destination: updateValue.destination || '',
                            duration: updateValue.duration || '',
                            day: updateValue.day || '',
                            maxPeople: updateValue.maxPeople || '',
                            minAge: updateValue.minAge || '',
                            date: updateValue.date || '',
                            price: updateValue.price || '',
                            longDescription: updateValue.longDescription || ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdatePackage}
                        enableReinitialize
                    >
                        {({ setFieldValue }) => (
                            <FormikForm>
                                <Form.Group controlId="formImage">
                                    <Form.Label>Image File</Form.Label>
                                    <Field
                                        name="imageFile"
                                        render={({ field }) => (
                                            <Form.Control
                                                type="file"
                                                onChange={(e) => {
                                                    handleFileChange(e);
                                                    setFieldValue("imageFile", e.target.files[0]);
                                                }}
                                            />
                                        )}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="name"

                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="description"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formLongDescription">
                                    <Form.Label>Long Description</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="longDescription"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formDestination">
                                    <Form.Label>Destination</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="destination"
                                    />
                                    <ErrorMessage name="destination" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formDuration">
                                    <Form.Label>Duration</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="duration"
                                    />
                                    <ErrorMessage name="duration" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formDay">
                                    <Form.Label>Day</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="day"
                                    />
                                    <ErrorMessage name="day" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formMaxPeople">
                                    <Form.Label>Max People</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="number"
                                        name="maxPeople"
                                    />
                                    <ErrorMessage name="maxPeople" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formMinAge">
                                    <Form.Label>Min Age</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="number"
                                        name="minAge"
                                    />
                                    <ErrorMessage name="minAge" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formDate">
                                    <Form.Label>Date</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="date"
                                        name="date"
                                    />
                                    <ErrorMessage name="date" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="number"
                                        name="price"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-danger" />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Add Record
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdatePackage


// import React, { useEffect, useState } from "react";
// import "./TravelIn.css";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { userDetail } from "../servicer/userDetail";
// import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
// import { Navbar } from "react-bootstrap";
// import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";

// const TravelIn = () => {
//     const [selectedLink, setSelectedLink] = useState(null);
//     const [userdata, setUserData] = useState("");
//     const [isEditing, setIsEditing] = useState(false);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await userDetail();
//                 console.log("Received data:", data);
//                 setUserData(data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);
//     const handleMenuItemClick = (link) => {
//         setSelectedLink(link)
//             ;
//     };

//     return (
//         <div>
//             <Navbar className="navbar">
//                 <img
//                     src={require("../images/travel-logo.png")}
//                     style={{ width: "3%", marginLeft: "10px" }}
//                 />
//             </Navbar>
//             <div style={{ display: "flex", height: "100vh" }}>
//                 <Sidebar style={{ color: "white" }}>
//                     <Menu
//                         style={{ color: "white" }}
//                         menuItemStyles={{
//                             button: {
//                                 color: "wh8f8888fb",
//                                 "&:hover": {
//                                     backgroundColor: "white",
//                                     color: "#8f8888fb",
//                                     border: "1px solid #16aaac",
//                                 },
//                                 [`&.active`]: {
//                                     backgroundColor: "#8f8888fb",
//                                     color: "#b6c8d9",
//                                 },
//                             },
//                         }}
//                     >
//                         <MenuItem onClick={() => handleMenuItemClick("UserDetail")}>
//                             <svg data-testid="SupervisedUserCircleOutlinedIcon"></svg>{" "}
//                             UserDetail
//                         </MenuItem>
//                         <MenuItem onClick={() => handleMenuItemClick("Calendar")}>
//                             Packages
//                         </MenuItem>
//                         <MenuItem onClick={() => handleMenuItemClick("E-commerce")}>
//                             Destination
//                         </MenuItem>
//                         <MenuItem onClick={() => handleMenuItemClick("Contact")}>
//                             Contact
//                         </MenuItem>
//                         <MenuItem onClick={() => handleMenuItemClick("Booking")}>
//                             Booking
//                         </MenuItem>
//                     </Menu>
//                 </Sidebar>

//                 <div
//                     style={{
//                         marginLeft: "100px",
//                         padding: "30px",
//                     }}
//                 >
//                     {selectedLink === "UserDetail" && (
//                         <div>
//                             {
//                                 <MDBTable>
//                                     <MDBTableHead className="header-table">
//                                         <tr>
//                                             <th scope="col" style={{ color: "white" }}>
//                                                 ID
//                                             </th>
//                                             <th scope="col" style={{ color: "white" }}>
//                                                 Name
//                                             </th>
//                                             <th scope="col" style={{ color: "white" }}>
//                                                 Email
//                                             </th>
//                                             <th scope="col" style={{ color: "white" }}>
//                                                 Password
//                                             </th>
//                                             <th scope="col" style={{ color: "white" }}>
//                                                 OTP
//                                             </th>
//                                             <th scope="col" style={{ color: "white" }}>
//                                                 Action
//                                             </th>
//                                         </tr>
//                                     </MDBTableHead>
//                                     <MDBTableBody>
//                                         {userdata.data?.map((user) => (
//                                             <tr key={user._id}>
//                                                 <td>{user._id}</td>
//                                                 <td>{user.name}</td>
//                                                 <td>{user.email}</td>
//                                                 <td>{user.password}</td>
//                                                 <td>{user.OTP}</td>
//                                                 <td>
//                                                     <MDBBtn className="me-1" color="success">
//                                                         {" "}
//                                                         Update
//                                                     </MDBBtn>
//                                                     <MDBBtn className="me-1" color="danger">
//                                                         {" "}
//                                                         Delete
//                                                     </MDBBtn>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </MDBTableBody>
//                                 </MDBTable>
//                             }
//                         </div>
//                     )}
//                     {selectedLink === "Calendar" && <p>This is the calendar content.</p>}
//                     {selectedLink === "E-commerce" && (
//                         <p>This is the e-commerce content.</p>
//                     )}
//                     {selectedLink === "Contact" && <p>This is the contact content.</p>}
//                     {selectedLink === "Booking" && <p>This is the booking content.</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TravelIn;



