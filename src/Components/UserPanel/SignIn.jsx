import React, { useState,useRef } from 'react';
import { Form,Alert } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
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

const SignIn = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef=useRef()
  const passwordRef=useRef()
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstData: firstName,
          lastData: lastName,
          emailData: email,
          passwordData: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Redirect to the specified URL
          if(emailRef.current.value===email&&passwordRef.current.value===password){
            localStorage.setItem("emailData",email)
            localStorage.setItem("passwordData",password)
          }
          navigate(data.redirectUrl);
          window.location.reload();
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

          <Form onSubmit={handleSubmit}>
              <MDBContainer fluid>

                  <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                      <MDBCol col='12'>

                          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                  <h2 className="fw-bold mb-2 text-uppercase">SignUp</h2>
                                  <p className="text-white-50 mb-5">Create An Account</p>

                                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='First Name' id='formControlLg' type='text' size="lg" onChange={(e) => setFirstName(e.target.value)} />
                                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Last Name' id='formControlLg' type='text' size="lg" onChange={(e) => setLastName(e.target.value)} />
                                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
                                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} />
                                  {errorMessage && <Alert className='text-center text-danger' variant="danger">{errorMessage}</Alert>}

                                  <MDBBtn outline className='mx-2 px-5 text-white bg-primary' color='white' size='lg'>
                                      SignUp
                                  </MDBBtn>

                                  <div>
                                      <p className="mb-0">Already have an Account <a href="/login" class="text-white-50 fw-bold">Log In</a></p>

                                  </div>
                              </MDBCardBody>
                          </MDBCard>

                      </MDBCol>
                  </MDBRow>

              </MDBContainer>
          </Form>
      </div>
  );
}

export default SignIn;
