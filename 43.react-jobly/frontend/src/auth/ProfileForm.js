import React, { useState, useContext } from 'react';
import JoblyApi from '../api/api';
import UserContext from './UserContext';
import Alert from '../Components/Alert';

//User profile form
//Allows changing first/last name, email and password
function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirm, setSaveConfirm] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };
    let username = formData.username;
    let updateUser;

    try {
      updateUser = await JoblyApi.saveProfile(username, profileData);
    } catch (e) {
      setFormErrors(e);
      return;
    }
    setFormData(formData => ({...formData, password: ""}));
    setFormErrors([]);
    setSaveConfirm(true);
    setCurrentUser(updateUser);
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className='col-md-6 col-lg-4 offset-md-3 offset-lg-4'>
      <h3>User Profile</h3>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Username</label>
              <p className='form-control-plaintext'>{formData.username}</p>
            </div>
            <div className='form-group'>
              <label>First Name</label>
              <input 
                name="firstName"
                className='form-control'
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Last Name</label>
              <input 
                name="lastName"
                className='form-control'
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input 
                name="email"
                className='form-control'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Confirm password to make changes:</label>
              <input 
                type="password"
                name="password"
                className='form-control'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length
             ? <Alert type="danger" messages={formErrors} />
             : null}
            {saveConfirm
             ? <Alert type="success" messages={["Updated!"]} />
             : null}
            <button className='btn btn-primary btn-block mt-4'>Save Changes</button>
          </form>
        </div>

      </div>

    </div>
  );
}

export default ProfileForm;