import styled from 'styled-components';


export const RightWrapper = styled.div`
  display: grid;
  grid-auto-rows: 200px auto;
`;

export const LabelIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  background: #ffd166;
  white-space: pre-wrap;
`;

export const Label = styled.div`
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin: 1rem;
  align-items: baseline;
`;

export const GoogleButton = styled.a`
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 2px solid #0466c8;
  padding: 0.3rem;
  border-radius: 10px;
  text-decoration: none;
  color: #0466c8;
  width: 200px;
`;
