import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { data } from '../App';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
  setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      toast.success("Login successful");
    } catch (error) {
      setError("Invalid email or password");
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div className={styles.fullpage} >
       <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <p className={styles.linkText}>
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
    </div>
    
  );
}

export default Login;
