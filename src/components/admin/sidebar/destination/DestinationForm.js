import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { AddDestination, UpdateDestination } from '../../../../services/Services';

const DestinationForm = ({ show, handleClose, handleFileChange, edit, updateValue, handleGetDestination, packageId, data }) => {
    const [image, setImage] = useState(null);

    const validationSchema = Yup.object({
        state: Yup.string().required('Required'),
        place: Yup.string().required('Required'),
    });
    const handleSubmit = async (record, { resetForm }) => {
        try {
            const formdata = new FormData();
            formdata.append('state', record.state);
            formdata.append('place', record.place);
            if (image) {
                formdata.append('image', image);
            }
            const response = edit ? await UpdateDestination(packageId, formdata) : await AddDestination(formdata)
            if (response && response.status === 200) {
                handleGetDestination();
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
        state: edit ? updateValue.state : '',
        place: edit ? updateValue.place : '',
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{edit ? "Update Destination" : "Add Destination"}</Modal.Title>
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
                                <Form.Group controlId="formState">
                                    <Form.Label>State</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="state"
                                    />
                                    <ErrorMessage name="state" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formPlace">
                                    <Form.Label>Place</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="place"
                                    />
                                    <ErrorMessage name="place" component="div" className="text-danger" />
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

export default DestinationForm;


