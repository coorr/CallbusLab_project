export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('Authorization'));
  if (user && user.token) {
    return  'Bearer ' + user.token ; // for Spring Boot back-end

  } else {
    return {};
  }
}
