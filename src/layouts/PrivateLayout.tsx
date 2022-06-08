import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderWrapper, RightSideWrapper, BrandName } from './styles';
import { PinkButton } from '@styles/commonStyle';
import Auth from '@utils/auth';
import { useSocket } from '@hooks/useSocketIo';


const PrivateLayout = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [, disconnect] = useSocket(null);
  const handleLogout = async () => {
    disconnect();
    await Auth.logOut();
    return navigate('/');
  };

  return (
    <div>
      <HeaderWrapper>
        <RightSideWrapper>
          <BrandName>ZOLACK</BrandName>
          <div>/ {Auth.getUsername()}</div>
        </RightSideWrapper>
        <PinkButton onClick={handleLogout}>Logout</PinkButton>
      </HeaderWrapper>
      {children}
    </div>
  )
};

export default PrivateLayout;
