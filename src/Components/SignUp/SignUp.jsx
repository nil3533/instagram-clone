import React, { useState } from "react";

import { storage, authentication } from "../firebase";

const SignUp = () => {
  const [emailId, setEmailId] = useState();
  const [name, setName] = useState();
  const [userName, setuserName] = useState();
  const [password, setPassword] = useState();

  const newSignUp = () => {
    authentication
      .createUserWithEmailAndPassword(emailId, password)
      .then((userCredentials) => {
        var user = userCredentials.user;

        let payload = {
          userId: user.uid,
          userName: userName,
          name: name,
          profileImage: "",
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          "Access-Control-Allow-Origin": "*",
          body: JSON.stringify(payload),
        };

        fetch("http://localhost:8080/users", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("users", JSON.stringify(user));
            window.location.reload();
          })
          .catch((error) => {});
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage + errorCode);
      });
  };

  return (
    <div>
      <input
        className="logipage__text"
        onChange={(e) => {
          setEmailId(e.target.value);
        }}
        type="text"
        placeholder="Mobile number or Email"
      />
      <input
        className="logipage__text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        placeholder="Full Name"
      />
      <input
        className="logipage__text"
        onChange={(e) => {
          setuserName(e.target.value);
        }}
        type="text"
        placeholder="Username"
      />
      <input
        className="logipage__text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
      />
      <button className="login__button" onClick={newSignUp}>
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
