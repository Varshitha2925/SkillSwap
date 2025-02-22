import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (response.ok) {
      navigate('/login');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-2xl mb-4'>Signup</h2>
      <input type='text' placeholder='Name' className='p-2 border' value={name} onChange={(e) => setName(e.target.value)} />
      <input type='email' placeholder='Email' className='p-2 border mt-2' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' className='p-2 border mt-2' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup} className='mt-4 bg-green-500 text-white px-4 py-2'>Signup</button>
    </div>
  );
};
export default Signup;