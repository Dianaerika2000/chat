import { api } from '../config/site.config';
import { createBrowserHistory } from 'history';
import AuthService from '../config/auth.service';

const history = createBrowserHistory();

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user.token != null) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (typeof response.data.status !== 'undefined') {
      if (response.data.status === 'Token is Expired') {
        // alert('Por favor inicia sesión de nuevo.')
        AuthService.logout();
      }
    }
    if (typeof response.data.success !== 'undefined' && response.data.message === 'No Autorizado') {
      // alert('Por favor inicia sesión de nuevo.')
      AuthService.logout();
    }
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        AuthService.logout();
        let public_url = '';
        if (typeof process.env.PUBLIC_URL !== 'undefined') {
          public_url = process.env.PUBLIC_URL;
        } else {
          if (typeof process.env.VUE_APP_PUBLIC_URL !== 'undefined') {
            public_url = process.env.VUE_APP_PUBLIC_URL;
          }
        }
        history.push({ pathname: public_url + '/login' });
        window.location.reload();
      } else if (err.response.status === 405 || err.response.status === 500) {
        // alert('Hubo un error con su pedido.')
      } else {
        // alert('Error de conexión, por favor trata de nuevo.')
      }
    } else {
      // alert('Error de conexión, por favor trata de nuevo.')
    }
    return Promise.reject(err);
  },
);
