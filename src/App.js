import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/admin/login/AdminLogin';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/admin/login/ForgotPassword';
import AdminHome from './components/admin/login/AdminHome';
import Booking from './components/admin/sidebar/booking/Booking';
import Packages from './components/admin/sidebar/Packages/Packages';
import Destination from './components/admin/sidebar/destination/Destination'
import Contact from './components/admin/sidebar/contacts/Contact'
import UserDetails from './components/admin/sidebar/userDetails/UserDetails'
import Protected from './components/protected/Protected';
import Slider from './components/admin/sidebar/slider/Slider';
import Guides from './components/admin/sidebar/guides/Guides';
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
          <Route path='/slider' element={<Slider />}></Route>
          <Route path='/guide' element={<Guides />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
