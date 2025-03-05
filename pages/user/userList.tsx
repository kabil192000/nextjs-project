
import UsersHeaderFile from '@/app/components/UsersHeaderFile';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
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

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  
  useEffect(() => {
    fetchUsers();
  }, []);

  
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users'); // Endpoint to get all users
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/users?id=${id}`); 
      fetchUsers(); 
    } catch (err) {
      console.error('Error deleting user', err);
    }
  };

 
  const handleSearch = async () => {
    if (!searchQuery) {
      fetchUsers(); 
    } else {
      try {
        const res = await axios.get(`/api/users?query=${searchQuery}`);
        setUsers(res.data);
      } catch (err) {
        console.error('Error searching users', err);
      }
    }
  };

 
  const handleEdit = (id: number) => {
    router.push(`/user/userEdit?id=${id}`);
  };

  return (

    <>
    <UsersHeaderFile />
 
    <div className="container mt-4">
      <h1 className="mb-4">Users</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.full_name}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <FooterNJ />
    
    </>
  );
};

export default UsersPage;
