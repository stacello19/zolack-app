import axios from 'axios';
const api = axios.create();
import Auth from './auth';

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = Auth.getJwtToken();
    config.headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    };

    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  async (response) => {
    // request new access token with refresh token
    if (response.data.code === 500 && response.data.error === 'TokenExpiredError: jwt expired') {
      const refreshToken = Auth.getRefreshToken();
      const { data } = await axios.post('/api/auth/token', { token: refreshToken } );

      // refresh token expires log out the user
      if (data.code === 400 || data.code === 403 || data.code === 500 && data.error === 'TokenExpiredError: jwt expired') {
        await api.post('/api/auth/logout', { token: Auth.getRefreshToken() });
        sessionStorage.clear();
        return;
      }

      Auth.setJwtToken(data.accessToken);
      return api(response.config);
    }
    return response;
  }, async (error) => {
    return Promise.reject(error);
  }
)

export { 
  api 
}