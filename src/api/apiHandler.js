import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
  // display server error pages here
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUsers() {
    return service
      .get("/api/users")
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

  postCollab(object) {
    return service
      .post(`/api/collabs/`, object)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getCollabs() {
    return service.get("/api/collabs").then((res) => res.data);
  },

  getCategories() {
    return service.get("/api/categories").then((res) => res.data);
  },

  getSkills() {
    return service.get("/api/skills").then((res) => res.data);
  },

  filterUsedCities() {
    return service
      .get("/api/users")
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

  filterUsedSkillsUsers() {
    return service
      .get("/api/skills")
      .then((res) => res.data.filter((el) => el.currentlyInUse))
      .catch(errorHandler);
  },

  filterUsedCategoriesUsers() {
    return service
      .get("/api/categories")
      .then((res) => res.data.filter((el) => el.currentlyInUse))
      .catch((err) => console.log(err));
  },

  filterUsedSkillsCollabs() {
    return service
      .get("/api/skills")
      .then((res) => res.data.filter((el) => el.currentlyInUseOnCollabs))
      .catch(errorHandler);
  },

  filterUsedCategoriesCollabs() {
    return service
      .get("/api/categories")
      .then((res) => res.data.filter((el) => el.currentlyInUseOnCollabs))
      .catch((err) => console.log(err));
  },

  // get users that have a complete freelancer profile
  getFreelancers() {
    return service
      .get("/api/users")
      .then((res) =>
        res.data.filter(
          // (el) => el.bio && el.location && el.title && el.userCategory
          (el) => el.location && el.userCategory
        )
      )
      .catch(errorHandler);
  },
  // Messages
  createMessageThread(id1, id2) {
    return service
      .post(`/api/messages/new/${id1}/${id2}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getOneMessage(id) {
    return service
      .get("/api/messages/message/" + id)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  sendOneMessage(id, message) {
    return service
      .post(`/api/messages/message/` + id, message)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getAllMessages(id) {
    return service
      .get(`/api/messages/user/` + id)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  markAsRead(id) {
    return service
      .patch(`/api/messages/unread/` + id)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  checkNotifications(id) {
    return service
      .get(`/api/messages/unread/` + id)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
};
