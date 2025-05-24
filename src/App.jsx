import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';


import { Toaster } from 'react-hot-toast';
export let data = JSON.parse(localStorage.getItem('userData')) || [];

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
     

  );
}

export default App;
