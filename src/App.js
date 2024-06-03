import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/admin/login/AdminLogin';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/admin/login/ForgotPassword';
import AdminHome from './components/admin/login/AdminHome';
import Booking from './components/admin/sidebar/Booking';
import Packages from './components/admin/sidebar/Packages/Packages';
import Destination from './components/admin/sidebar/destination/Destination'
import Contact from './components/admin/sidebar/Contact'
import UserDetails from './components/admin/sidebar/UserDetails'
import Protected from './components/protected/Protected';
function App() {
  return (
    <>
      <Routes>
        <Route path='/adminlogin' element={<AdminLogin />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/' element={<Protected Component={AdminHome} />}>
          <Route path='/booking' element={<Booking />}></Route>
          <Route path='/packages' element={<Packages />}></Route>
          <Route path='/destination' element={<Destination />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/userdetail' element={<UserDetails />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
