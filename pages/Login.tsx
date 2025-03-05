// pages/login.tsx
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';  // Import GoogleLogin component
import Header from '../app/components/Header';
import FooterNJ from '@/app/components/FooterNJ';

interface LoginFormData {
  email: string;
  password: string;
}

const CLIENT_ID = '165987205197-6u8mgeo5k609keav3ic4gvv9noi6g4ea.apps.googleusercontent.com'; // Replace with your Google Client ID

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        router.push('/user/userList');
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

 
  const handleGoogleLoginSuccess = async (response: any) => {
    const { credential } = response;

    // Send token to your server to verify and create a session
    try {
      const res = await fetch('/api/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: credential })
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Google login successful:', data);
        router.push('/user/userList');
      } else {
        const error = await res.json();
        console.error('Google login failed:', error);
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  // Google login failure handler
  const handleGoogleLoginFailure = (error: any) => {
    console.error('Google login error:', error);
  };

  return (
    <>
    <Header />
    <div className='login-container'>
    <div className="container mt-4">
      <h3 className="text-center mb-1">Login</h3>

      {/* Regular login form */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>

      {/* Google Login Button */}
      <div className="mt-4">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
      
          useOneTap={true}  // Optional: Automatically prompt users for Google login
        />
      </div>
    </div></div>
<FooterNJ />
    </>
  );
};

export default Login;
