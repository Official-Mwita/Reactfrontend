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
import NotFound from "./NotFound";

const url = "http://imetechs.com/account";
//const url = "http://localhost:8000";

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
    <Router basename="/user">
      <Header auth={authInfo} changeAuthInfo={createAuthInfo} />
      <Routes>
        <Route 
          path = "/dashboard"
          element = {<ProtectedRoutes component={Dashboard} auth={authInfo}/>}
        />
        <Route 
          path="/login"
          element={<AuthRoute component={Login} auth={authInfo} changeAuth={changeAuthInfo}/>}
        />
        <Route index element={<ProtectedRoutes component={Dashboard} auth={authInfo}/>} />
        <Route 
          path="/register"
          element={<AuthRoute component={Register} auth={authInfo} changeAuth={changeAuthInfo}/>}
        />
        <Route 
          path="/place-order"
          element={<PlaceOrderRoute 
            component={OrderWrapper} 
            authInfo={authInfo} 
            order={order}
            createOrder={createOrder}
            updatePendingOrder={updatePendingOrder}
            />}
        />
        <Route path="*" element = {<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
