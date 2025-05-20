import { useState } from 'react';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { data } from '../App';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

export default function SignUp() {
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
try {
   await createUserWithEmailAndPassword(auth, formData.email, formData.password);
   navigate('/');
} catch (error) {
  setError(error.message);
}
  //   const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

     
  //   const emailExists = existingUsers.some(user => user.email === formData.email);

  //   if (emailExists) {
  //   setError('Email already registered');
  //   return;
  // }



  //    // for local storage

  //    const updatedUsers = [...existingUsers, {
  //     name: formData.name,
  //     email: formData.email,
  //     password: formData.password,
  //    }];


  //    localStorage.setItem("users", JSON.stringify(updatedUsers));

  //     console.log("User data: ", updatedUsers);
  //     navigate('/');
    
  //   // Send data to API or handle signup logic
    
  //   setError('');
  };

  return (

   <div className={styles.fullpage}>
       
       <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h2>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}
        
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>
      </form>
    </div>


   </div>

    
   
  );
}
