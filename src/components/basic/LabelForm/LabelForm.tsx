import React, { FC } from 'react';
import { Label, Form } from './styles';

interface LabelFormProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
}

const LabelForm: FC<LabelFormProps> = ({ label, name, value, onChange }) => {
  return (
    <div style={{ width: '100%', margin: '15px 0' }}>
      <Label>{label}</Label>
      <Form type='text' name={name} value={value} onChange={onChange}/>
    </div>
  )
};

export default LabelForm;
