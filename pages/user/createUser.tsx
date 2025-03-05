import React, { useState, ChangeEvent, FormEvent } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import UsersHeaderFile from '@/app/components/UsersHeaderFile';
import FooterNJ from '@/app/components/FooterNJ';
const apiUrl = '/api/users';


interface FormData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  profile_picture_url: string;
  role: string;
  status: string;
  email_verified: boolean;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

const CreateUser: React.FC = () => {
  
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    full_name: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    profile_picture_url: 'https://example.com/profile.jpg',
    role: 'user',
    status: 'active',
    email_verified: true,
    address_line: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  
 

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
       
        setFormData({
          username: '',
          email: '',
          password: '',
          full_name: '',
          phone_number: '',
          date_of_birth: '',
          gender: '',
          profile_picture_url: 'https://example.com/profile.jpg',
          role: 'user',
          status: 'active',
          email_verified: true,
          address_line: '',
          city: '',
          state: '',
          postal_code: '',
          country: ''
        });
        alert('User created successfully!');
      } else {
        setError(result.error || 'Failed to create user');
        console.error('Error Response:', result);
      }
    } catch (err) {
      console.error('Network Error:', err);
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <UsersHeaderFile />
 
      <div className="container mt-5">
        <h2>Create New User</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="form-control"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="date_of_birth" className="form-label">Date Of Birth</label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  className="form-control"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="form-control"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="address_line" className="form-label">Address</label>
                <input
                  type="text"
                  id="address_line"
                  name="address_line"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address_line}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="form-control"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="postal_code" className="form-label">Pin Code</label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  className="form-control"
                  placeholder="Postal Code"
                  value={formData.postal_code}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <FooterNJ />
    </>
  );
};

export default CreateUser;
