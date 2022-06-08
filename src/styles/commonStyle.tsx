import styled from 'styled-components';

export const BasicWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 0.4fr 1fr;
  height: 100vh;
`;

export const PinkButton = styled.button`
  width: 200px;
  padding: 1rem;
  border-radius: 10px;
  outline: none;
  border: none;
  color: white;
  background: #ef476f;
  font-size: 18px;
  font-weight: 600;
  margin: 2rem 0;
`;

export const LightGrayButton = styled.button`
  background: #e9ecef;
  border-radius: 10px;
  padding: 1rem;
  height: 50px;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
`

export const OutlinedButton = styled.button`
  border-radius: 10px;
  padding: 1rem;
  outline: none;
  border: 2px solid black;
  cursor: pointer;
  font-weight: 500;
  width: 150px;
  background: white;
  font-size: 18px;
`;

export const WhiteButton = styled.button`
  border-radius: 10px;
  padding: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  width: 150px;
  background: white;
  font-size: 18px;
`;
