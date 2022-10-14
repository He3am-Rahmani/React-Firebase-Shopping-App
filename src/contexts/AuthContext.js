import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useState as useHookState } from "@hookstate/core";
import userStore from "../userStore";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const userState = useHookState(userStore);

  function signup(email, password, userName) {
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      if (user !== null) {
        user.user.updateProfile({ displayName: userName });
      }
    });
  }

  const login = async (email, password) => {
    // console.log("signin function called ");
    // console.log('currentUser Logged');
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    setCurrentUser(user);
    userState.set({
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
    return { data: currentUser, type: "success" };
  };

  const logout = () => auth.signOut();

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  const updateEmail = (email) => currentUser.updateEmail(email);

  const updatePassword = (password) => currentUser.updatePassword(password);

  const updateUserName = (userName) =>
    currentUser.updateProfile({ displayName: userName });

  const updateAvatarPic = (avUrl) =>
    currentUser.updateProfile({ photoURL: avUrl });

  const user = (currentUser) => {
    return currentUser;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUserName,
    updateAvatarPic,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
