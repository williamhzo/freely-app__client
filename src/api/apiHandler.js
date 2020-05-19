import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post('/api/auth/signup', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post('/api/auth/signin', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get('/api/auth/isLoggedIn')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get('/api/auth/logout')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUsers() {
    return service
      .get('/api/users')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUser(key, value) {
    return service
      .get(`/api/users?${key}=${value}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  patchUser(id, object) {
    return service
      .patch(`/api/users/${id}`, object)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getCollab(id) {
    return service
      .get(`/api/collabs/` + id)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  patchCollab(id, object) {
    return service
      .patch(`/api/collabs/${id}`, object)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getCollabs() {
    return service.get('/api/collabs').then((res) => res.data);
  },

  getCategories() {
    return service.get('/api/categories').then((res) => res.data);
  },

  getSkills() {
    return service.get('/api/skills').then((res) => res.data);
  },

  filterUsedCities() {
    return service
      .get('/api/users')
      .then((res) =>
        [...res.data]
          .filter((el) => el.bio && el.location && el.title && el.userCategory)
          .map((el) => el.location)
          .sort((a, b) => a > b)
          .reduce((a, b) => {
            // slice(-1)[0] means last item in array without removing it (like .pop())
            if (a.slice(-1)[0] !== b) a.push(b);

            return a;
          }, [])
      )
      .catch(errorHandler);
  },

  filterUsedSkills() {
    return service
      .get('/api/skills')
      .then((res) => [...res.data].filter((el) => el.currentlyInUse))
      .catch(errorHandler);
  },

  filterUsedCategories() {
    return service
      .get('/api/categories')
      .then((res) => [...res.data].filter((el) => el.currentlyInUse))
      .catch((err) => console.log(err));
  },

  // get users that have a complete freelancer profile
  getFreelancers() {
    return service
      .get('/api/users')
      .then((res) =>
        res.data.filter(
          (el) => el.bio && el.location && el.title && el.userCategory
        )
      )
      .catch(errorHandler);
  },
};
