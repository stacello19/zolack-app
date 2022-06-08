import React, { useCallback } from 'react';
import LabelForm from '@components/basic/LabelForm';
import { RegisterProps } from '@typings/auth';


const RegisterComponent = ({ fname, lname, email, password, setValues }: RegisterProps) => {

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues?.((prev: any)=> ({...prev, [name]: value }) );
  },[]);

  return (
    <div style={{ width: '500px' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <LabelForm label={'First Name'} value={fname} name={'fname'} onChange={handleChange} />
        <LabelForm label={'Last Name'} value={lname} name={'lname'} onChange={handleChange} />
      </div>
      <LabelForm label={'Email'} value={email} name={'email'} onChange={handleChange} />
      <LabelForm label={'Password'} value={password} name={'password'} onChange={handleChange} />
    </div>
  )
};

export default RegisterComponent;
