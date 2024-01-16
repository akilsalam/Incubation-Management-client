import React, { useState, useEffect } from 'react';
import { Table, ProgressBar } from 'react-bootstrap';

const ProgressBarPage = () => {
  const [allApplicant, setAllApplicant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/recordList');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('API Response:', data);
        setAllApplicant(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []);

  const calculateProgress = (status) => {
    switch (status) {
      case 'new':
        return 45;
      case 'pending':
        return 80;
      default:
        return 100;
    }
  };

  return (
    <div>
      <h1>Record List</h1>
      <hr />
      <Table className='text-center' bordered hover size="sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Company Name</th>
            <th>Company Details</th>
            <th>Registration Approved</th>
            <th>Under Process</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {allApplicant.map((applier, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{applier.company}</td>
              <td>{applier.describeCompany}</td>
              <td colSpan={'3'}>
                <ProgressBar
                  now={calculateProgress(applier.status)}
                  label={`${calculateProgress(applier.status)}%`}
                  visuallyHidden
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProgressBarPage;
