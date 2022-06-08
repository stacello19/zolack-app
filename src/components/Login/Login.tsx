import React, { useCallback } from 'react';
import LabelForm from '@components/basic/LabelForm';
import { LoginProps } from '@typings/auth';


const LoginComponent = ({ email, password, setValues }: LoginProps) => {

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues?.((prev: any) => ({...prev, [name]: value }) );
  },[]);

  return (
    <div style={{ width: '500px' }}>
      <LabelForm label={'Email'} value={email} name={'email'} onChange={handleChange} />
      <LabelForm label={'Password'} value={password} name={'password'} onChange={handleChange} />
    </div>
  )
};

export default LoginComponent;
