import React from 'react';
import { Button,Table } from 'react-bootstrap';

const NewList = () => {
  return (
    <div>
          <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Company Name</th>
          <th>Company Detail</th>
          <th>Personal Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td><Button></Button></td>
          <td><Button></Button></td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default NewList;
