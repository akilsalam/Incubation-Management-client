import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import ApprovedApplicant from './ApprovedApplicant';

const PendingApplicant = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [describeTeam, setDescribeTeam] = useState('');
    const [describeCompany, setDescribeCompany] = useState('');
    const [problemSolve,setProblemSolve] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [applicant, setApplicant] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch user data from the server
        fetch('http://localhost:3000/admin/pendingApplicant')
          .then((res) => res.json())
          .then((data) => setApplicant(data))
          .catch((error) => console.error('Error fetching user data:', error));
      }, []);

      const approvedBtn = async (applier) => {
        try {
          const response = await fetch(`http://localhost:3000/admin/approvedApplicant/${applier._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: applier.name,
              city: applier.city,
              email: applier.email,
              company: applier.company,
              address: applier.address,
              state: applier.state,
              phone: applier.phone,
              describeTeam: applier.describeTeam,
              describeCompany: applier.describeCompany,
              problemSolve: applier.problemSolve
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Redirect to the specified URL
              const pendingConfirmed = window.confirm('Are you sure you want to put this user to Approved List?');
    
              if (pendingConfirmed) {
                
                  navigate(data.redirectUrl);
                  window.location.reload()
              }
              // window.location.reload();
            } else {
              // Display error message from the server
              setErrorMessage(data.message || 'Registration failed');
            }
          } else {
            console.error('Failed to send data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const declineBtn = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/decline/${userId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const confirmation = window.confirm('Are you sure about deleting the data?');
                    if (confirmation) {
                        // If user clicks "OK," reload the page
                        window.location.reload();
                    }
                } else {
                    console.error('Failed to delete user:', data.error || 'Unknown error');
                }
            } else {
                const errorData = await response.json(); // Log the error response
                console.error('Failed to delete user:', 'Server returned an error', errorData);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
  return (
    <div>
      <h1>Pending Applicant List</h1>
      <hr />
      <Table className='text-center' bordered hover size="sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Company Name</th>
            <th>Company Details</th>
            <th>Personal Details</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applicant.map((applier, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{applier.company}</td>
              <td>{applier.describeCompany}</td>
              <td><Button className='bg-dark'><Link style={{color:'white',textDecoration:'none'}} to={`/admin/permenentDetail/${applier._id}`}>Open</Link></Button></td>
              <td><Button className='bg-success' onClick={() => approvedBtn(applier)}>Approved</Button></td>
              <td><Button className='bg-danger' onClick={() => declineBtn(applier._id)}>Decline</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ApprovedApplicant/>
    </div>
  );
};

export default PendingApplicant;
