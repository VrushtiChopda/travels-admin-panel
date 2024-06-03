import React from 'react';
import { Button, Form, FormCheck, FormControl, FormLabel, NavLink } from 'react-bootstrap';
import login from '../../../assets/login.jpg';
import '../login/AdminLogin.css';
import { ErrorMessage, Formik, Field } from 'formik';
import { object, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
    const navigate = useNavigate()
    const LoginSchema = object({
        email: string('enter only Strings').email('Invalid email format').required('Email is required'),
        password: string('enter only strings').min(6, 'Enter minimum 6 characters').max(10, 'Enter maximum 10 characters').required('Password is required')
    });
    const handleLogin = async (adminData) => {
        try {
            const res = await axios.post('http://localhost:2000/api/admin/loginAdmin', adminData)
            console.log(res.data, '---------admin login--------------')
            localStorage.setItem('token', res.data.token)
            navigate('/')
        } catch (error) {
            console.log(error, 'login error')
        }
    }
    return (
        <>
            <div>
                <h2 className='m-3 logo'>TRAVELS</h2>
            </div>
            <div className='container mt-5 '>
                <div className='row '>
                    <div className='col-sm-12 col-lg-6 col-md-4 loginImage  '>
                        <img src={login} alt='login' />
                    </div>
                    <div className='col-sm-12 col-lg-6 col-md-8 login-container p-5 '>
                        <h2>Welcome to Travels</h2>
                        <p>Please Sign-in to your account and start your Adventure</p>
                        <hr />
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={handleLogin}
                        >
                            {({ touched, errors, handleSubmit }) => (
                                <Form onSubmit={handleSubmit} className='mt-5 '>
                                    <FormLabel htmlFor='email'>Enter Email</FormLabel>
                                    <Field
                                        as={FormControl}
                                        type='email'
                                        name='email'
                                        className={`w-100 ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name='email' component='div' className='text-danger' />

                                    <div>
                                        <FormLabel htmlFor='password'>Enter Password</FormLabel>
                                    </div>
                                    <Field
                                        as={FormControl}
                                        type='password'
                                        name='password'
                                        className={`w-100  ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name='password' component='div' className='text-danger' />
                                    <div className="d-sm-flex my-3 ">
                                        <Field
                                            as={FormCheck}
                                            label='Remember me'
                                        />
                                        <Link to='/forgotpassword' className='ms-auto text-primary text-decoration-none '>Forgot Password?</Link>
                                    </div>

                                    <Button type='submit ' className='w-100  mt-4'>Login</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;


// import React from 'react'
// import { Button, Form, FormControl, FormLabel } from 'react-bootstrap'
// import login from '../../../assets/login.jpg'
// import '../login/AdminLogin.css'
// import { ErrorMessage, Formik, } from 'formik'
// import { object, string } from 'yup'
// function AdminLogin() {
//     const LoginSchema = object({
//         email: string('enter only Strings').required('email is required'),
//         password: string('enter only strings').min(6, 'enter minimum 6 characters').max(10, 'enter maximum 10 characters').required('password is required')
//     })
//     return (
//         <>
//             <div>
//                 <h2>Travels</h2>
//             </div>
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col-6 loginImage' >
//                         <img
//                             src={login}
//                             alt='login-image'></img>
//                     </div>
//                     <div className='col-6'>
//                         <h2>Welcome to Travels</h2>
//                         <p>Please Sign-in to your account and start your Adventure</p>
//                         <Formik
//                             initialValues={{
//                                 email: '',
//                                 password: ''
//                             }}
//                             validationSchema={LoginSchema}
//                         // onS
//                         >
//                             {({ touched, errors }) => (
//                                 <Form>
//                                     <FormLabel
//                                         htmlFor='email'
//                                     >Enter Email</FormLabel>
//                                     <FormControl
//                                         name='email'
//                                         className='w-50 mb-4'
//                                     // onError={touched.email && Boolean(errors.email)}
//                                     ></FormControl>
//                                     <ErrorMessage for='email' />
//                                     <FormLabel
//                                         htmlFor='password'
//                                     >Enter Password</FormLabel>
//                                     <FormControl
//                                         name='password'
//                                         className='w-50 mb-4'
//                                     ></FormControl>

//                                     <Button
//                                         type='submit'
//                                         className='w-50'
//                                     > Sign-in</Button>
//                                 </Form>
//                             )}

//                         </Formik>

//                     </div>
//                 </div>
//             </div >

//         </>
//     )
// }

// export default AdminLogin
