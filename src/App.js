import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile';
import PrivateRoute from './components/PrivateRoute'
import OpenRoute from './components/OpenRoute'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from './services/operations/profileApi';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const storedToken = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(storedToken, navigate));
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);


  return (
    <div className="min-h-screen w-screen overflow-hidden  bg-black">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route 
        path="/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
