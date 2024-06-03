import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { FaBars } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './AdminHome.css'
function AdminHome() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);

    return (
        <>
            <div style={{ background: "#f0f0f0" }}>
                <div className='container-fluid sidebar-hidden'>
                    <div className='row'>
                        <div className='col-2 '>
                            <Sidebar>
                                <div style={{ height: '100vh' }}>
                                    <Menu
                                        menuItemStyles={{
                                            button: {
                                                [`&.active`]: {
                                                    backgroundColor: '#13395e',
                                                    color: '#b6c8d9',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem> <h2 className='m-3 logo'>TRAVELS</h2></MenuItem>
                                        <MenuItem component={<Link to="/userdetail" />}> User Details</MenuItem>
                                        <MenuItem component={<Link to="/packages" />}> Packages</MenuItem>
                                        <MenuItem component={<Link to="/destination" />}>Destination</MenuItem>
                                        <MenuItem component={<Link to="/contact" />}>Contact</MenuItem>
                                        <MenuItem component={<Link to="/booking" />}>Booking</MenuItem>
                                    </Menu>
                                </div>
                            </Sidebar>
                        </div>
                        <div className='col-10'>
                            <AdminNavbar />
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            <div className='responsiveSidebar'>
                <div>
                    <button className="btn offcanvas-button fs-3" type="button" onClick={handleShowOffcanvas} style={{ color: 'black' }}>
                        <FaBars />
                    </button>
                </div>
                <div className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ visibility: showOffcanvas ? 'visible' : 'hidden' }}>
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close text-reset" aria-label="Close" onClick={handleCloseOffcanvas}></button>
                    </div>
                    <div className="offcanvas-body">
                        <Menu
                            menuItemStyles={{
                                button: {
                                    [`&.active`]: {
                                        backgroundColor: '#13395e',
                                        color: '#b6c8d9',
                                    },
                                },
                            }}
                        >
                            <MenuItem> <h2 className=' logo'>TRAVELS</h2></MenuItem>
                            <MenuItem component={<Link to="/userdetail" />}> User Details</MenuItem>
                            <MenuItem component={<Link to="/packages" />}> Packages</MenuItem>
                            <MenuItem component={<Link to="/destination" />}>Destination</MenuItem>
                            <MenuItem component={<Link to="/contact" />}>Contact</MenuItem>
                            <MenuItem component={<Link to="/booking" />}>Booking</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className='col-10'>
                    <AdminNavbar />
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default AdminHome;


// import React from 'react'
// import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
// import { FaBars } from "react-icons/fa6";
// import { Link, Outlet } from 'react-router-dom'
// import Navbar from './AdminNavbar'
// import AdminNavbar from './AdminNavbar'
// function AdminHome() {

//     return (
//         <>

//             <div style={{ background: "#f0f0f0" }}>
//                 <div className='container-fluid'>
//                     <div className='row'>
//                         <div className='col-2 ' >
//                             <Sidebar>
//                                 <div style={{ height: '100vh' }}>
//                                     <Menu
//                                         menuItemStyles={{
//                                             button: {
//                                                 // the active class will be added automatically by react router
//                                                 // so we can use it to style the active menu item
//                                                 [`&.active`]: {
//                                                     backgroundColor: '#13395e',
//                                                     color: '#b6c8d9',
//                                                 },
//                                             },
//                                         }}
//                                     >
//                                         <MenuItem> <h2 className='m-3 logo'>TRAVELS</h2></MenuItem>
//                                         <MenuItem component={<Link to="/userdetail" />}> User Details</MenuItem>
//                                         <MenuItem component={<Link to="/packages" />}> Packages</MenuItem>
//                                         <MenuItem component={<Link to="/destination" />}>Destination</MenuItem>
//                                         <MenuItem component={<Link to="/contact" />}>Contact</MenuItem>
//                                         <MenuItem component={<Link to="/booking" />}>Booking</MenuItem>
//                                     </Menu>
//                                 </div>
//                             </Sidebar>
//                         </div>
//                         <div className='col-10'>
//                             <AdminNavbar />
//                             <Outlet />
//                         </div>
//                     </div>
//                 </div>
//             </div >
//             <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
//                 <FaBars />
//             </button>

//             <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
//                 <div class="offcanvas-header">
//                     <h5 class="offcanvas-title" id="offcanvasExampleLabel">TRAVELS</h5>
//                     <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
//                 </div>
//                 <div class="offcanvas-body">
//                     <div style={{ height: '100vh' }}>
//                         <Menu
//                             menuItemStyles={{
//                                 button: {
//                                     // the active class will be added automatically by react router
//                                     // so we can use it to style the active menu item
//                                     [`&.active`]: {
//                                         backgroundColor: '#13395e',
//                                         color: '#b6c8d9',
//                                     },
//                                 },
//                             }}
//                         >
//                             <MenuItem> <h2 className='m-3 logo'>TRAVELS</h2></MenuItem>
//                             <MenuItem component={<Link to="/userdetail" />}> User Details</MenuItem>
//                             <MenuItem component={<Link to="/packages" />}> Packages</MenuItem>
//                             <MenuItem component={<Link to="/destination" />}>Destination</MenuItem>
//                             <MenuItem component={<Link to="/contact" />}>Contact</MenuItem>
//                             <MenuItem component={<Link to="/booking" />}>Booking</MenuItem>
//                         </Menu>
//                     </div>
//                     {/* <div>
//                         Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
//                     </div>
//                     <div class="dropdown mt-3">
//                         <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
//                             Dropdown button
//                         </button>
//                         <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                             <li><a class="dropdown-item" href="#">Action</a></li>
//                             <li><a class="dropdown-item" href="#">Another action</a></li>
//                             <li><a class="dropdown-item" href="#">Something else here</a></li>
//                         </ul>
//                     </div> */}
//                 </div>
//             </div>
//         </>



//     )
// }

// export default AdminHome
