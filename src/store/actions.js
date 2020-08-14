import firebase from "firebase/app";

const actions = {
  authAction({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setUser", user);
      } else {
        commit("setUser", null);
      }
    });
  },
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        commit("setError", error.message);
      });
  },
  signInAction({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        commit("setError", error.message);
      });
  },
  signOutAction({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .catch(error => {
        commit("setError", error.message);
      });
  }
};

export default actions;
