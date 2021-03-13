import React, { useState } from "react";
import { storage, authentication } from "../firebase";

const SignIN = () => {
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    authentication
      .signInWithEmailAndPassword(emailId, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        localStorage.setItem("users", JSON.stringify(user));
        window.location.reload();
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  return (
    <div>
      <input
        className="logipage__text"
        type="text"
        onChange={(e) => {
          setEmailId(e.target.value);
        }}
        placeholder="Phone number, username, or email"
      />
      <input
        className="logipage__text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
      />
      <button className="login__button" onClick={login}>
        Log In
      </button>
    </div>
  );
};

export default SignIN;
