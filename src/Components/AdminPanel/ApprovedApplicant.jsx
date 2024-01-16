import React,{useState,useEffect} from 'react';
import { Table,Button } from 'react-bootstrap';

const ApprovedApplicant = () => {
    const [approvedApplicant, setApprovedApplicant] = useState([]);


    useEffect(() => {
        // Fetch user data from the server
        fetch('http://localhost:3000/admin/approvedApplicant')
          .then((res) => res.json())
          .then((data) => setApprovedApplicant(data))
          .catch((error) => console.error('Error fetching user data:', error));
      }, []);
  return (
    <div>
    <h1>Approved Applicant List</h1>
      <hr />
      <Table className='text-center' bordered hover size="sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Company Name</th>
            <th>Company Details</th>
          </tr>
        </thead>
        <tbody>
          {approvedApplicant.map((applier, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{applier.company}</td>
              <td>{applier.describeCompany}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ApprovedApplicant;
