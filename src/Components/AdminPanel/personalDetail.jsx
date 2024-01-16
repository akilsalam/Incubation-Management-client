import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalDetail = () => {

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

    const navigate = useNavigate()


    let url = window.location.href;
    url = url.split('/');
    const userId = url[url.length - 1];
  
    useEffect(() => {
      // Fetch user data based on the userId from the server
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/admin/personalDetail/${userId}`);
          if (response.ok) {
            const userData = await response.json();
              setName(userData.name)
              setCity(userData.city)
              setEmail(userData.email)
              setCompany(userData.company)
              setAddress(userData.address)
              setState(userData.state)
              setPhone(userData.phone)
              setDescribeTeam(userData.describeTeam)
              setDescribeCompany(userData.describeCompany)
              setProblemSolve(userData.problemSolve)

          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`http://localhost:3000/admin/personalEditedDetail/${userId}`, {
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
                problemSolve:problemSolve
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Handle success, e.g., redirect to another page
              navigate(data.redirectUrl)
            } else {
              setErrorMessage(data.message || 'Update failed');
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
      <div class="container-xl px-4 mt-4">
    {/* <!-- Account page navigation--> */}
    <div class="row">
        <div class="col-xl-4">
            {/* <!-- Profile picture card--> */}
            <div class="card mb-4 mb-xl-0">
                <div class="card-header">Profile Picture</div>
                <div class="card-body text-center">
                    {/* <!-- Profile picture image--> */}
                    <img class="img-account-profile rounded-circle mb-2" src="data:image/png;base64,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" alt=""/>
                    {/* <!-- Profile picture help block--> */}
                    <div class="small font-italic  mb-4 text-primary">You:<p className='text-muted'>{name}</p>Email:<p className='text-muted'>{email}</p>Phone No:<p className='text-muted'>{phone}</p></div>

                </div>
            </div>
        </div>
        <div class="col-xl-8">
            {/* <!-- Account details card--> */}
            <div class="card mb-4">
                <div class="card-header">Account Details</div>
                <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* <!-- Form Group (username)--> */}
                        <div class="mb-3">
                            <label class="small mb-1" for="inputUsername">Name</label>
                            <input class="form-control" id="inputUsername" type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        {/* <!-- Form Row--> */}
                        <div class="row gx-3 mb-3">
                            {/* <!-- Form Group (first name)--> */}
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputFirstName">Address</label>
                                <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                            </div>
                            {/* <!-- Form Group (last name)--> */}
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLastName">State</label>
                                <input class="form-control" id="inputLastName" type="text" placeholder="Enter your state" value={state} onChange={(e)=>setState(e.target.value)}/>
                            </div>
                        </div>
                        {/* <!-- Form Row        --> */}
                        <div class="row gx-3 mb-3">
                            {/* <!-- Form Group (organization name)--> */}
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Phone number</label>
                                <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                            </div>
                            {/* <!-- Form Group (location)--> */}
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLocation">Location</label>
                                <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location" value={city} onChange={(e)=>setCity(e.target.value)}/>
                            </div>
                        </div>
                        {/* <!-- Form Group (email address)--> */}
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">Email address</label>
                            <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={email} onChange={(e)=>setEmail(e.target.email)}/>
                        </div>
                        {/* <!-- Form Row--> */}
                        {/* <!-- Save changes button--> */}
                        <button class="btn btn-primary" type="submit">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  );
}

export default PersonalDetail;
