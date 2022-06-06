import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await signup(formData);
    if (res.success) {
      navigate("/companies");
    } else {
      navigate("/signup");
    }
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({...formData, [name]: value }));
  }

  return (
    <div className='SignUpForm'>
      <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
        <h2 className='mb-3'>Sign Up</h2>
        <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label>Username</label>
                  <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div><div className='form-group'>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div><div className='form-group'>
                  <label>Email</label>
                  <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className='btn btn-primary float-right'
                  >Submit</button>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;