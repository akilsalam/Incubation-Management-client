import React,{ useState , useRef} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Form,Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const adminEmail = useRef()
  const adminPassword = useRef()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a server endpoint that validates the login
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          if(adminEmail.current.value===email&&adminPassword.current.value===password){
            localStorage.setItem("AdminEmail",email)
            localStorage.setItem("AdminPassword",password)
          }
          navigate(data.redirectUrl);
          window.location.reload();
        } else {
          setErrorMessage(data.message || 'User Name Not Found!!🧐');
        }
      } else {
        console.error('Invalid credentials');
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error during login. Please try again.');
    }
  };
  return (
    <div>

      <Form onSubmit={handleSubmit}>

    <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
      <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

        <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
        <hr />
        <hr />

        <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" ref={adminEmail}  onChange={(e) => setEmail(e.target.value)}/>
        <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" ref={adminPassword}   onChange={(e) => setPassword(e.target.value)}/>

      {errorMessage && <Alert className='text-center text-danger ' variant="danger">{errorMessage}</Alert>}
        <MDBBtn outline className='mx-2 px-5 text-white bg-primary' color='white' size='lg' >
          Login
        </MDBBtn>

      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
      </Form>
          </div>
  );
}

export default Login;
