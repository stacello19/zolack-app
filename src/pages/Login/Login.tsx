import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RightWrapper, LabelIconWrapper, Label, LoginWrapper, ToggleWrapper, GoogleButton } from './styles';
import { BasicWrapper, PinkButton, LightGrayButton } from '@styles/commonStyle';
import Register from '@components/Register';
import Login from '@components/Login';
import Auth from '@utils/auth';


const LoginPage = () => {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(true);
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const jwtToken = Auth.getJwtToken();
    if (jwtToken) {
      navigate('/home', { replace: true });
    }
  },[]);

  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    if (isMember) {
      await Auth.logIn({ email: values.email, password: values.password });
    } else {
      await Auth.register(values);
    }

    setValues({
      fname: '',
      lname: '',
      email: '',
      password: ''
    });
    navigate('/home', { replace: true });
  },[values, isMember]);

  return (
    <BasicWrapper>
      <LabelIconWrapper>
        <div style={{ marginLeft: '10%' }}>
          <Label>Zolack</Label>
          <h3>{'Welcome to Zolack\nMade by Stacy Cho'}</h3>
        </div>
        <img src='/images/login.png' alt='login' width={500} height={500} style={{ alignSelf: 'center' }}/>
      </LabelIconWrapper>
      <RightWrapper>
        <ToggleWrapper>
          <div>{ isMember ? 'Not a member?' : 'Already a member?' }</div>
          <LightGrayButton onClick={() => setIsMember(!isMember)}>{ isMember ? 'Sign Up' : 'Sign In' }</LightGrayButton>
        </ToggleWrapper>
        <LoginWrapper>
          <h1 style={{ width: '500px' }}>Connect your account</h1>
          <form onSubmit={handleSubmit}>
            { isMember ? 
              <Login 
                email={values.email}
                password={values.password}
                setValues={setValues} 
              /> : 
              <Register 
                fname={values.fname}
                lname={values.lname}
                email={values.email}
                password={values.password}
                setValues={setValues} 
              /> 
            }
            <PinkButton type='submit'>{ isMember ? 'Sign In' : 'Create Account' }</PinkButton>
            { isMember && 
              <GoogleButton href='/api/auth/google'>
                <img src={'/images/google.svg'} alt='googleIcon'/>
                <div>Google Sign In</div>
              </GoogleButton> 
            }
          </form>
        </LoginWrapper>
      </RightWrapper>
    </BasicWrapper>
  )
};

export default LoginPage;
