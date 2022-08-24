import React, { Component }  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";
import OrderWrapper from "./components/OrderWrapper";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import AuthRoute from "./components/Routes/AuthRoute";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PlaceOrderRoute from "./components/Routes/PlaceOrderRoute";

//const url = "https://topnopch.com/account";
const url = "http://localhost:8000";

function App() {
  const [authInfo, createAuthInfo] = useState({
    loggedIn: false,
    token: "",
    csrfToken: "",
    url: url,
    userName: "username",
    fname: "first name",
    pendingOrder: false,
  });

  //Order object
  //Made app state to avoid losing on changing state
  const [order, createOrder] = useState({
    academicLevel: "College",
    subject: "",
    typeOfPaper: "Essay",
    writingService: "Writing",
    writingStyle: "APA",
    orderDescription: "",
    noOfPages: 3,
    hours: 72,
    cost: 0.0,
    currency: "USD",
    spacing: "Double",
    supportiveFiles: [null],
    orderFeasibility: true,
  });

  useEffect(() => {
    const userTokens = async () => {
      const res = await fetch(url + "/tokens");

      const data = await res.json();

      createAuthInfo({
        ...authInfo,
        loggedIn: data.success,
        token: data.api_key,
        userName: data.username,
        csrfToken: data._token,
      });
    };

    userTokens();
  }, []);

  const changeAuthInfo = (loggedUser) => {
    const username = loggedUser.user.username;
    const firstName = loggedUser.user.fname;
    const token = loggedUser.token;
    const success = loggedUser.success;

    //createAuthInfo({ ...authInfo, loggedIn: true });

    createAuthInfo({
      ...authInfo,
      token: token,
      loggedIn: success,
      userName: username,
      fname: firstName,
    });
  };

  const updatePendingOrder = (boolean) => {
    createAuthInfo({ ...authInfo, pendingOrder: boolean });
  };

  return (
    <Router basename="account/user">
      <Header auth={authInfo} changeAuthInfo={createAuthInfo} />
      <Routes>
        <ProtectedRoutes
          path="/dashboard"
          component={Dashboard}
          auth={authInfo}
        />
        <AuthRoute
          path="/login"
          component={Login}
          auth={authInfo}
          changeAuth={changeAuthInfo}
        />
        <ProtectedRoutes path="/" exact component={Dashboard} auth={authInfo} />
        <AuthRoute
          path="/register"
          component={Register}
          auth={authInfo}
          changeAuth={changeAuthInfo}
        />
        <PlaceOrderRoute
          path="/place-order"
          component={OrderWrapper}
          authInfo={authInfo}
          order={order}
          createOrder={createOrder}
          updatePendingOrder={updatePendingOrder}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Routes>
    </Router>
  );
}

export default App;
