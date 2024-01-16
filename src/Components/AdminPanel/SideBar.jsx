import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import for routing
import NewList from './NewList'; // Import child components
import AdminLogin from './AdminLogin';

const SideBar = () => {
    const getAdminEmail = localStorage.getItem("AdminEmail")
    const getAdminPassword = localStorage.getItem("AdminPassword")
    const AdminLogOut = () =>{
        const userConfirmed = window.confirm('Are you sure you want to Log Out?');
    
        if (userConfirmed) {
            localStorage.removeItem('AdminEmail');
            localStorage.removeItem('AdminPassword');
            window.location.reload();
        }
    }
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
            {/* Sidebar content */}
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link to="/admin" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <h2 className="d-none d-sm-inline" style={{ fontFamily: 'cursive' }}>Reva Nest</h2>
              </Link>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu" style={{ color: 'dark', textDecoration: 'none', transition: 'color 0.3s' }}
                                      onMouseOver={(e) => e.target.style.color = 'white'}
                                      onMouseOut={(e) => e.target.style.color = 'blue'}>
                {/* Links for nested routes */}
                <li>
                  <Link to="/admin" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                {getAdminEmail&&getAdminPassword?(<div>

                    <li className="nav-item" >
                  <Link to="/admin/newApplicant" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">New List</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/pendingApplicant" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Checking List</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/RecordList" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Record List</span>
                  </Link>
                </li>
                </div>
                    ):null}
                {/* ...other links... */}
              </ul>
              <hr />
              <div className="pb-4">
                  <Link to="/"  style={{ color: 'dark', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'blue'}> <span className="ms-1 d-none d-sm-inline">User Panel</span></Link>
                <br />
                <br />
                {getAdminEmail&&getAdminPassword ? (
                    <button onClick={AdminLogOut} className="btn btn-danger">Log out</button>
                    ): <button className='btn btn-primary'><Link to="/admin/login" className="text-white" style={{textDecoration:'none'}} >Login</Link></button>}
              </div>
            </div>
          </div>
          <div className="col py-3">
        {/* Outlet to render nested routes */}
        <Outlet />
      </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
