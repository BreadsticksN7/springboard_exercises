import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Components/Alert';

function LoginForm({login}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await login(formData);
    if(res.success) {
      navigate("/companies");
    } else {
      setFormErrors(res.errors);
    }
  }
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({...formData, [name]: value }));
  }
  
  return (
    <div className='LoginForm'>
      <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
        <h3 className='mb-3'>Log In</h3>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Username</label>
                <input
                  name="username"
                  className='form-control'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null }

              <button
                className='btn btn-primary float-right' >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;