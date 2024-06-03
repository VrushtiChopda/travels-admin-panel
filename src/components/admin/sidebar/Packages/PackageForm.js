import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { addPackage, handleUpdatePackage } from '../../../../services/Services';

const PackageForm = ({ show, handleClose, handleFileChange, edit, updateValue, data, packageId }) => {
    const [image, setImage] = useState(null);

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
    const handleSubmit = async (record, { resetForm }) => {
        try {

            const formdata = new FormData();
            formdata.append('name', record.name);
            formdata.append('destination', record.destination);
            formdata.append('duration', record.duration);
            formdata.append('day', record.day);
            formdata.append('maxPeople', record.maxPeople);
            formdata.append('minAge', record.minAge);
            formdata.append('date', record.date);
            formdata.append('price', record.price);
            formdata.append('longDescription', record.longDescription);
            formdata.append('description', record.description);
            if (image) {
                formdata.append('image', image);
            }
            const response = edit ? await handleUpdatePackage(packageId, formdata) : await addPackage(formdata)
            if (response && response.status === 200) {
                data();
                resetForm();
                setImage(null);
                handleClose();
            } else {
                console.error('Unexpected response:', response);

            }
        } catch (error) {
            console.log(error)
        }
    };
    const initialValues = {
        name: edit ? updateValue.name : '',
        destination: edit ? updateValue.destination : '',
        description: edit ? updateValue.description : '',
        duration: edit ? updateValue.duration : '',
        day: edit ? updateValue.day : '',
        maxPeople: edit ? updateValue.maxPeople : '',
        minAge: edit ? updateValue.minAge : '',
        date: edit ? updateValue.date : '',
        price: edit ? updateValue.price : '',
        longDescription: edit ? updateValue.longDescription : ''
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{edit ? "Update package" : "Add new package"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <FormikForm>
                                <Form.Group controlId="formImage">
                                    <Form.Label>Image File</Form.Label>
                                    <Field
                                        name="image"
                                        render={({ field }) => (
                                            <Form.Control
                                                type="file"
                                                onChange={(e) => {
                                                    handleFileChange(e);
                                                    const file = e.target.files[0];
                                                    setFieldValue("image", file);
                                                    setImage(file);
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
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formLongDescription">
                                    <Form.Label>Long Description</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="longDescription"
                                    />
                                    <ErrorMessage name="longDescription" component="div" className="text-danger" />
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
                                    {edit ? "Update" : "Submit"}
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PackageForm;


