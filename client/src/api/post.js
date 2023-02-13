import http from './http';

export async function getPosts(cat) {
  return http({
    method: 'GET',
    url: cat ? `/post?cat=${cat}` : '/post'
  })
}

export function getPost(id) {
  return http({
    method: 'GET',
    url: '/post/' + id
  })
}


export function deletePost(id) {
  return http({
    method: 'DELETE',
    url: '/post/' + id
  })
}

export function updatePost(id, data) {
  return http({
    method: 'PUT',
    url: '/post/' + id,
    data
  })
}

export function addPost(data) {
  return http({
    method: 'POST',
    url: '/post',
    data
  })
}
