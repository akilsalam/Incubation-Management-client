import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
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
    let [status,setStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const appliedName = useRef()
    const appliedMail = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/applyForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    city: city,
                    email: email,
                    company: company,
                    address:address,
                    state: state,
                    phone:phone,
                    describeTeam:describeTeam,
                    describeCompany:describeCompany,
                    problemSolve:problemSolve,
                    status:status
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                setStatus = 'new'
                // if(appliedName.current.value===name&&appliedMail.current.value===email){
                    localStorage.setItem("AppliedName",name)
                    localStorage.setItem("AppliedMail",email)   
                // }
            //   Redirect to the specified URL
            navigate('/')
                window.confirm('Form Submitted')
            //   window.location.reload();
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
            <div class="container">
                <br />
                <h1 className='text-center' style={{ fontFamily: 'fantasy' }}>Application For Incubation</h1>
                <br />
                <div id="form">
                    <form  className="row" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input type="text" className="form-control form-data" ref={appliedName} id="Name" onChange={(e) => setName(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="City">City</label>
                                <input type="text" className="form-control form-data" ref={appliedMail} id="City" onChange={(e) => setCity(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input type="text" className="form-control form-data" id="Email" onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="CompanyName">Company Name</label>
                                <input type="text" className="form-control form-data" id="CompanyName" onChange={(e) => setCompany(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Address">Address</label>
                                <input type="text" className="form-control form-data" id="Address" onChange={(e) => setAddress(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="State">State</label>
                                <input type="text" className="form-control form-data" id="State" onChange={(e) => setState(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="PhoneNo">Phone no</label>
                                <input type="text" className="form-control form-data" id="PhoneNo" onChange={(e) => setPhone(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="CompanyLogo">Company Logo</label>
                                <input type="file" className="form-control form-data" id="CompanyLogo" required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Describe Your Team and Background</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" onChange={(e) => setDescribeTeam(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Describe your company and Products</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" onChange={(e) => setDescribeCompany(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Describe the problem you are trying to solve</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" onChange={(e) => setProblemSolve(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">What is the unique about your solution?</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">What is your value proposition for the customer?</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Who are your competitors and what is your competative advantage?</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Explain your revenue model</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">What is the potential market size of the product?</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">How do you market or plan to market your products and services</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" required/>
                        </div>
                        <div>
                            <label htmlFor="">Type of Incubation needed</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name='incubation' id="flexCheckDefault" required/>
                                <label class="form-check-label" for="flexCheckDefault">
                                    Physical Incubation
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name='incubation' id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Virtual Incubation
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Upload a deatailed business proposal</label>
                            <textarea class="form-control bg-light" cols="30" rows="3" required/>
                        </div>
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ApplicationForm;
