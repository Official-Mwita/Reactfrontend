import React, { Component }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

function Register({ changeAuth, auth }) {
  const his = useNavigate();

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [_token, setToken] = useState("");
  const [serverError, setServerError] = useState({
    message: "",
    success: false,
    classError: "invisible",
  });

  //Form data error
  const [userNameerror, setuserNameerror] = useState("");
  const [userEmailerror, setuserEmailerror] = useState("");
  const [userPassworderror, setuserPassworderror] = useState("");

  //loading visibility changes
  const [btnVisibility, setBtnVisibility] = useState("loadVisible");
  const [spinnerVisibility, setSpinnerVisibility] = useState("loadInvisible");

  // const loggedIn = authInfo.loggedIn;
  // const his = useNavigate();
  // useEffect(() => {
  //   if (loggedIn) {
  //     his.push("/dashboard");
  //   }
  // }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (false) {
      alert("please add a task");
      return;
    }

    //change buttons visibilities
    setBtnVisibility("loadInvisible");
    setSpinnerVisibility("loadVisible");

    registerUser();
  };

  const registerUser = async () => {
    let _token = auth.csrfToken;
    let registerData = {
      username,
      email,
      password,
      fname,
      password_confirmation,
      _token,
    };

    try {
      const res = await fetch(auth.url + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(registerData),
      });

      const data = await res.json();

      //General message from the server
      var mes = "";

      if (data.success) {
        changeAuth(data);
        if (auth.pendingOrder) his.push("place-order");
        else his.push("/dashboard");
      } else {
        //Invert submission buttons visibilites
        setBtnVisibility("loadVisible");
        setSpinnerVisibility("loadInvisible");

        //Set form data errors
        setuserNameerror(data.errors.username);
        setuserEmailerror(data.errors.email);
        setuserPassworderror(data.errors.password);

        //Clear passwords field
        setPassword("");
        setPasswordConfirmation("");

        res.status === 419
          ? (mes = "Request could not be processed!")
          : (mes = "Correct fields below");
        setServerError({ ...serverError, message: mes, classError: "visible" });
      }
    } catch (error) {
      setBtnVisibility("loadVisible");
      setSpinnerVisibility("loadInvisible");
      setServerError({
        ...serverError,
        message: "Server Error! Try again",
        classError: "visible",
      });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={onSubmit}>
          <h3>Register an Account</h3>
          <p className={serverError.classError}>{serverError.message}</p>
          <div className="form-group">
            <label>Name</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {userNameerror && (
              <span className="formDataError">{userNameerror}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              required
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {userEmailerror && (
              <span className="formDataError">{userEmailerror}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              required
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {userPassworderror && (
              <span className="formDataError">{userPassworderror}</span>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              required
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div className={spinnerVisibility} style={{ textAlign: "center" }}>
            <Spinner animation="grow" variant="success" />
          </div>

          <button
            type="submit"
            className={btnVisibility + " btn btn-success btn-block "}
          >
            Register
          </button>
          <p className="forgot-password text-right">
            Already registered <Link to="/login">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
