import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import AppNavbar from './components/AppNavbar';
import auth from './data/auth/firebaseConfig';
import userExistsInDB from './data/userData';
import { Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authed) => {
      if (authed) {
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],
        };
        setUser(userObj);
        sessionStorage.setItem('idToken', authed.accessToken);
        userExistsInDB(authed.accessToken);
      } else if (user || user === null) {
        setUser(false);
        sessionStorage.removeItem('idToken');
        navigate('/')
      }
    });
  }, []);

  return (
    <div className='App'>
      <AppNavbar user={user} />
      <Routes user={user} />
    </div>
  );
}

export default App;
