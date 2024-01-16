import React,{ useState } from 'react';
import { Dropdown,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const getEmailRef = localStorage.getItem("emailData")
    const getPasswordRef = localStorage.getItem("passwordData")
    
    const logOut = () => {
        const userConfirmed = window.confirm('Are you sure you want to Log Out?');
    
        if (userConfirmed) {
            localStorage.removeItem('emailData');
            localStorage.removeItem('passwordData')
            localStorage.removeItem('AppliedName')
            localStorage.removeItem('AppliedMail')
            window.location.reload();
        }
    }
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  return (
      <div className=' text-white'>
          <div>
              <h1 className='bg-dark text-center ' style={{ fontFamily: "cursive" }}>Reva Nest</h1>
                   <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1em' }}>
              <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        More
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item ><Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>Home</Link></Dropdown.Item>
        {getEmailRef && getPasswordRef ? (<div>

            <Dropdown.Item ><Link style={{ color: 'black', textDecoration: 'none' }} onClick={logOut}>LogOut</Link></Dropdown.Item>
            <Dropdown.Item ><Link to={'/applyForm'} style={{ color: 'black', textDecoration: 'none' }}>Application Form</Link></Dropdown.Item>
        </div>
            ):
        <Dropdown.Item ><Link to={'/login'} style={{ color: 'black', textDecoration: 'none' }}>Login</Link></Dropdown.Item>
            }
        <Dropdown.Item ><Link to={'/admin'} style={{ color: 'black', textDecoration: 'none' }}>Admin Panel</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                  </div>
          </div>
      </div>
  );
}

export default Navbar;
