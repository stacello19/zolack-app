import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
import Auth from '@utils/auth';
import LoginPage from '@pages/Login';
import HomePage from '@pages/Home';
import GoogleCallbackPage from '@pages/GoogleCallback';


const App = () => {

  const RequiredAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const jwtToken = Auth.getJwtToken();
    if (!jwtToken) {
      return <Navigate to='/login' state={{ from: location }} replace /> 
    }
    return (
      <PrivateLayout>
        {children}
      </PrivateLayout>
    );
  };

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/google-auth' element={<GoogleCallbackPage />} />
      <Route 
        path='/home'
        element={
          <RequiredAuth>
            <HomePage/>
          </RequiredAuth>
        }
      />
    </Routes>
  )
}

export default App;
