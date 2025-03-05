
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import UsersHeaderFile from '@/app/components/UsersHeaderFile';
import FooterNJ from '@/app/components/FooterNJ';

interface User {
  id: number;
  username: string;
  email: string;
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

const userEdit = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUser(id as string);
    }
  }, [id]);

  
  const fetchUser = async (id: string) => {
    try {
      const res = await axios.get(`/api/users?id=${id}`);
      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error('Error fetching user', err);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      if (prev) {
        return { ...prev, [name]: value };  // Spread prev if it's not null
      }
      return prev; 
    });
  };
  

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData) {
        await axios.put(`/api/users?id=${id}`, formData); 
        router.push('/users'); 
      }
    } catch (err) {
      console.error('Error updating user', err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (

    <>
    <UsersHeaderFile />
 
    <div className="container mt-4">
      <h1 className="mb-4">Edit User</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData?.username || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData?.email || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            className="form-control"
            value={formData?.full_name || ''}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="form-control"
            value={formData?.phone_number || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date_of_birth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            className="form-control"
            value={formData?.date_of_birth || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
  <label htmlFor="gender" className="form-label">
    Gender
  </label>
  <input
    id="gender"
    name="gender"
    className="form-select"
    value={formData?.gender || ''}
    onChange={handleChange}
   />
  
</div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push('/users')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <FooterNJ />
    
    </>
  );
};

export default userEdit;
