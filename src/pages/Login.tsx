// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });
//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem('token', data.token);
//       navigate('/dashboard');
//     } else {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className='flex flex-col items-center p-4'>
//       <h2 className='text-2xl mb-4'>Login</h2>
//       <input type='email' placeholder='Email' className='p-2 border' value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type='password' placeholder='Password' className='p-2 border mt-2' value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin} className='mt-4 bg-blue-500 text-white px-4 py-2'>Login</button>
//     </div>
//   );
// };
// export default Login;
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// interface LoginForm {
//   email: string;
//   password: string;
// }

const Login: React.FC = () => {
  const [userType, setUserType] = useState<string>("patient");
  const [email , setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [error, seterror] = useState<string>('')
  const [user, setuser] = useState<string>('')
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${userType}:`, {
      email,
      password
    });
    
    if(userType === "patient"){
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password,
        });
        localStorage.setItem('userId', response.data.data._id);
        setuser(response.data.data)
        console.log("USER", user)
        // navigate('/dashboard');
        
        if (response.statusText === "OK") {
          console.log('Login successful');
           // Save token to local storage
          navigate('/dashboard'); // Redirect to user/organizer dashboard
        } else {
          // setError(response.data.message || 'Login failed');
        }
      } catch (err: any) {

      }
    }
    else if(userType === "doctor"){
      try {
        const response = await axios.post('http://localhost:3000/api/doctor/login', {
          email,
          password,
        });
  
        console.log("response",response)
        localStorage.setItem('userId', response.data.user._id); // Save token to local storage
        navigate('/doctor-dashboard'); 
  
        if (response.statusText === "OK") {
          console.log('Login successful');
          // Redirect to user/organizer dashboard
        } else {
          seterror('Admin has not approved yet....!')
          // setError(response.data.message || 'Login failed');
        }
      } catch (err: any) {
        console.error('Login error:', err);
      }
    
    }
    else if(userType === "nurse"){
      navigate('/nurse-dashboard')
    
    }
    else{
      navigate('/admin-dashboard');
    }
    
  };

  return (
    <div className="login-page" style={styles.container}>
      <h2>Login</h2>
      <select
          id="role"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          style={styles.select}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="admin">Admin</option>
        </select>
      <form className="login-form" onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          style={styles.input}
          required
        />

        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          style={styles.input}
          required
        />

        {error && <p className="error-message">{error}</p>}        

        <button type="submit" style={styles.button}>Login</button>
        
      </form>

      <p className="register-link" style = {styles.registerLink} >
        Don’t have an account?{' '}
        <a href="/register" onClick={() => navigate('/register')}>
          Register here
        </a>
      </p>

    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    background: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold" as const,
    color: "#555",
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  select: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  registerLink: {
    marginTop: "15px",
    textAlign: "center" as const,
    color: "#007bff",
  },
};

export default Login;
