import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Components/UserPanel/Login';
import SignIn from './Components/UserPanel/SignIn';
import Home from './Components/UserPanel/Home';
import ApplicationForm from './Components/UserPanel/ApplicationForm';
import Booking from './Components/UserPanel/Booking';
import SideBar from './Components/AdminPanel/SideBar';
import AdminLogin from './Components/AdminPanel/AdminLogin';
import Navbar from './Components/UserPanel/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewApplicant from './Components/AdminPanel/NewApplicant';
import PendingApplicant from './Components/AdminPanel/PendingApplicant';
import PersonalDetail from './Components/AdminPanel/personalDetail';
import PermenentDetails from './Components/AdminPanel/PermenentDetails';
import RecordList from './Components/AdminPanel/RecordList';
import AdminHome from './Components/AdminPanel/AdminHome';

function App() {
  const location = useLocation();

  // Check if the current route starts with "/admin"
  const shouldRenderNavbar = !location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {shouldRenderNavbar && <Navbar />}
      
      <Routes>
        <Route path="/admin" element={<SideBar />}>
          {/* Nested routes */}
          <Route index element={<AdminHome/>} />
          <Route path="login" element={<AdminLogin />} />
          <Route path='newApplicant' element={<NewApplicant/>}/>
          <Route path='pendingApplicant' element={<PendingApplicant/>}/>
          <Route path='personalDetail/:id' element={<PersonalDetail/>}/>
          <Route path='permenentDetail/:id' element={<PermenentDetails/>}/>
          <Route path='recordList' element={<RecordList/>}/>
        </Route>
      </Routes>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/applyForm' element={<ApplicationForm />} />
        <Route path='/bookingSlot' element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;
