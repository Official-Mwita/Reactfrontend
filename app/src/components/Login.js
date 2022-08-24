import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

function Login({ changeAuth, auth }) {
  const his = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState({
    message: "",
    success: false,
    classError: "invisible",
  });

  //loading visibility changes
  const [btnVisibility, setBtnVisibility] = useState("loadVisible");
  const [spinnerVisibility, setSpinnerVisibility] = useState("loadInvisible");

  const loginUser = async () => {
    let _token = auth.csrfToken;
    let loginData = { email, password, rememberMe, _token };

    try {
      const res = await fetch(auth.url + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      //Server message
      var mes = "Unprocessable request";

      if (data.success) {
        changeAuth(data);
        auth.pendingOrder ? his.push("place-order") : his.push("/dashboard");
      } else {
        //Invert submission buttons visibilites
        setBtnVisibility("loadVisible");
        setSpinnerVisibility("loadInvisible");
        res.status === 419 ? (mes = "Connection error!") : (mes = data.message);
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (false) {
      alert("please add a task");
      return;
    }

    //change buttons visibilities
    setBtnVisibility("loadInvisible");
    setSpinnerVisibility("loadVisible");

    loginUser();
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={onSubmit}>
          <h3>LOGIN</h3>
          <p className={serverError.classError}>{serverError.message}</p>
          <div className="form-group">
            <label>Email Address</label>
            <input
              required
              type="email"
              className="form-control"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              required
              type="password"
              className="form-control"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="hidden" name="_token" value={auth.csrfToken} />

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input btn-success"
                id="remme"
                checked={rememberMe}
                value={rememberMe}
                onChange={(e) => setRememberMe(e.currentTarget.checked)}
              />
              <label className="custom-control-label" htmlFor="remme">
                Remember Me
              </label>
            </div>
          </div>
          <div className={spinnerVisibility} style={{ textAlign: "center" }}>
            <Spinner animation="grow" variant="success" />
          </div>

          <button
            type="submit"
            className={btnVisibility + " btn btn-success btn-block "}
          >
            Login
          </button>
          <p className="forgot-password">
            <span className="text-right">
              Forgot <a href="#">password?</a>{" "}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
