import http from './http.js'

export function uploadFile(data) {
  return http({
    method: 'POST',
    url: '/upload',
    data
  })
}
