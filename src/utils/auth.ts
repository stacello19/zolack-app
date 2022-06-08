import axios from 'axios';
import { api } from './api';
import { LoginProps, RegisterProps } from '@typings/auth';

class Auth {

  async getGoogleTokens() {
    const { data: { username, accessToken, refreshToken } } = await axios.get('/api/auth/google/tokens');
    const splittedUsername = username.split(':')[0];
    this.setJwtToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUsername(splittedUsername);
  }

  async register(values: RegisterProps) {
    const { data: { username, accessToken, refreshToken } } = await axios.post('/api/auth/register', 
      { 
        username: values.email, 
        password: values.password,
        firstName: values.fname,
        lastName: values.lname 
      } 
    );
    this.setJwtToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUsername(username);
  }

  async logIn(values: LoginProps) {
    const { data: { username, accessToken, refreshToken } } = await axios.post('/api/auth/login', { username: values.email, password: values.password } );
    this.setJwtToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUsername(username);
  };

  async logOut() {
    await api.post('/api/auth/logout', { token: this.getRefreshToken() } );
    sessionStorage.clear();
  }

  setJwtToken(token: string) {
    sessionStorage.setItem('jwt', token);
  };

  setRefreshToken(token: string) {
    sessionStorage.setItem('refreshToken', token);
  };

  setUsername(username: string) {
    sessionStorage.setItem('username', username);
  }

  getJwtToken() {
    return sessionStorage.getItem('jwt');
  };

  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  };

  getUsername() {
    return sessionStorage.getItem('username');
  };

};

export default new Auth();