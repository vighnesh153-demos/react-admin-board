import { auth } from "./firebase";

const tokenKey = "firebase-access-token";

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    return auth.signInWithEmailAndPassword(username, password)
      .then(res => {
        console.log(res);
        localStorage.setItem(tokenKey, res.user['xa']);
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err)
        return Promise.reject(err.message);
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem(tokenKey);
    return auth.signOut();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (auth.currentUser) {
      localStorage.removeItem(tokenKey);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem(tokenKey)
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
