import React,{useState,useEffect} from 'react';
import { Table,Button } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';

const NewApplicant = () => {
    const [newApplicant, setNewApplicant] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()


    useEffect(() => {
      // Fetch user data from the server
      fetch('http://localhost:3000/admin/appliedDetail')
        .then((res) => res.json())
        .then((data) => setNewApplicant(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }, []);

    const pendingBtn = async (applier) => {
        try {
          const response = await fetch(`http://localhost:3000/admin/pendingApplicant/${applier._id}`, {
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
              const pendingConfirmed = window.confirm('Are you sure you want to put this user to Pending List?');
    
              if (pendingConfirmed) {
                  navigate(data.redirectUrl);
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

  return (
    <div>
        <h1>New Applicant List</h1>
        <hr />
          <Table className='text-center' striped bordered hover size="sm">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Company Name</th>
          <th>Comapny Details</th>
          <th>Personal Details</th>
          <th>  </th>
        </tr>
      </thead>
      <tbody>
        {newApplicant.map((newApplier,index)=>(
            <tr key={index}>
          <td>{index + 1}</td>
          <td>{newApplier.company}</td>
          <td>{newApplier.describeCompany}</td>
          <td><Button className='bg-dark'><Link style={{color:'white',textDecoration:'none'}} to={`/admin/personalDetail/${newApplier._id}`}>Open</Link></Button></td>
          <td><Button className='bg-warning' onClick={() => pendingBtn(newApplier)}>Pending</Button></td>
        </tr>
            ))}
      </tbody>
    </Table>
    </div>
  );
}

export default NewApplicant;
