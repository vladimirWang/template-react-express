import http from './http';

export function login(data) {
  return http({
    method: 'POST',
    data,
    url: '/auth/login'
  });
}

export function register(data) {
  return http({
    method: 'POST',
    data,
    url: '/auth/register'
  });
}

export function logout(data) {
  return http({
    method: 'POST',
    data,
    url: '/auth/logout'
  });
}
