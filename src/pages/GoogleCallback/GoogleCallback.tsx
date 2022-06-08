import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '@utils/auth';


const GoogleCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Auth.getGoogleTokens();
    setTimeout(() => {
      const jwtToken = Auth.getJwtToken();
      if (jwtToken) {
        return navigate('/home');
      }
    }, 500)
  },[]);

  return (
    <div>Google Callback Authenticating....</div>
  )
};

export default GoogleCallbackPage;
