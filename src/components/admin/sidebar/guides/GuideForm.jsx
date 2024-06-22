import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { addGuide} from '../../../../services/Services';

const GuideForm = ({ show, handleClose, handleFileChange, handleGetguide }) => {
    const [image, setImage] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        designation: Yup.string().required('Required'),
    });

    const handleSubmit = async (record, { resetForm }) => {
        try {
            const formData = new FormData();
            formData.append('imageUrl', record.imageUrl);
            formData.append('name', record.name);
            formData.append('designation', record.designation);
            if (image) {
                formData.append('image', image);
            }
            console.log(formData, "----------------- formData ---------------------")

            const response = await addGuide(formData);
            console.log(response.data, " -----------slider data-------------------")
            if (response && response.status === 200) {
                handleGetguide();
                resetForm();
                setImage(null);
                handleClose();
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const initialValues = {
        name: '',
        heading: '',
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Slider</Modal.Title>
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
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFieldValue("image", file);
                                            setImage(file);
                                            handleFileChange(e);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <Form.Label>Guide Name</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="name"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formdesignation">
                                    <Form.Label>designation</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="designation"
                                    />
                                    <ErrorMessage name="designation" component="div" className="text-danger" />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default GuideForm;



// import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
// import React, { useState } from 'react'
// import { Button, Form, Modal } from 'react-bootstrap';
// import * as Yup from 'yup';
// import { addSlider } from '../../../../services/Services';

// const SliderForm = ({ show, handleClose, handleFileChange, handleGetDestination, packageId, data }) => {
//     const [image, setImage] = useState(null);

//     const validationSchema = Yup.object({
//         imageUrl: Yup.string().required('Required'),
//         title: Yup.string().required('Required'),
//         heading: Yup.string().required('Required'),
//         blog: Yup.string().required('Required'),
//     });
//     const handleSubmit = async (record, { resetForm }) => {
//         try {
//             const formdata = new FormData();
//             formdata.append('imageUrl', record.imageUrl);
//             formdata.append('title', record.title);
//             formdata.append('heading', record.heading);
//             formdata.append('blog', record.blog);
//             if (image) {
//                 formdata.append('image', image);
//             }

//             console.log(formdata, "----------------- formdata ---------------------")
//             const response = await addSlider(formdata)
//             if (response && response.status === 200) {
//                 handleGetDestination();
//                 resetForm();
//                 setImage(null);
//                 handleClose();
//             } else {
//                 console.error('Unexpected response:', response);

//             }
//         } catch (error) {
//             console.log(error)
//         }
//     };

//     const initialValues = {
//         imageUrl: '',
//         title: '',
//         heading: '',
//         blog: ''
//     };
//     return (
//         <>
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Slider</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Formik
//                         initialValues={initialValues}
//                         validationSchema={validationSchema}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ setFieldValue }) => (
//                             <FormikForm>
//                                 <Form.Group controlId="formImage">
//                                     <Form.Label>Image File</Form.Label>
//                                     <Field
//                                         name="image"
//                                         render={({ field }) => (
//                                             <Form.Control
//                                                 type="file"
//                                                 onChange={(e) => {
//                                                     handleFileChange(e);
//                                                     const file = e.target.files[0];
//                                                     setFieldValue("image", file);
//                                                     setImage(file);
//                                                 }}
//                                             />
//                                         )}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formtitle">
//                                     <Form.Label>title</Form.Label>
//                                     <Field
//                                         as={Form.Control}
//                                         type="text"
//                                         name="title"
//                                     />
//                                     <ErrorMessage name="title" component="div" className="text-danger" />
//                                 </Form.Group>
//                                 <Form.Group controlId="formheading">
//                                     <Form.Label>heading</Form.Label>
//                                     <Field
//                                         as={Form.Control}
//                                         type="text"
//                                         name="heading"
//                                     />
//                                     <ErrorMessage name="heading" component="div" className="text-danger" />
//                                 </Form.Group>
//                                 <Form.Group controlId="formblog">
//                                     <Form.Label>blog</Form.Label>
//                                     <Field
//                                         as={Form.Control}
//                                         type="text"
//                                         name="blog"
//                                     />
//                                     <ErrorMessage name="blog" component="div" className="text-danger" />
//                                 </Form.Group>
//                                 <Button variant="primary" type="submit" className="mt-3">
//                                     Submit
//                                 </Button>
//                             </FormikForm>
//                         )}
//                     </Formik>
//                 </Modal.Body>
//             </Modal>
//         </>
//     )
// }

// export default SliderForm
