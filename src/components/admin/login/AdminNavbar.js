import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import useDarkMode from 'use-dark-mode';
import { FaUserCircle } from "react-icons/fa";
// import Toggle from '../login/Toggle';
export default function AdminNavbar() {
    const darkMode = useDarkMode(false);
    return (
        <>
            <Navbar bg="light" data-bs-theme="light" className='container-fluid'>
                <Container className='p-0 d-flex justify-content-between'>
                    <div>
                        <button type="button" onClick={darkMode.enable}>
                            ☾
                        </button>
                    </div>
                    <div className='d-flex '>
                        <div>
                            <p className='m-0'> Hey User</p>
                            <span className='ms-4' style={{ fontSize: '12px' }}>Admin</span>
                        </div>
                        <div>
                            <FaUserCircle className='fs-2 mt-1' />
                        </div>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}
