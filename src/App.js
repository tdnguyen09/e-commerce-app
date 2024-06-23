import React from "react";
import Login from "./components/Login/Login";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import RefundPolicy from "./components/Policies/Refund-policy";
import TermOfService from "./components/Policies/TermofService";
import PrivacyPolicy from "./components/Policies/Privacy-policy";



function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path='/refund-policy'>
          <RefundPolicy />
        </Route>
        <Route path="/term-of-service">
          <TermOfService />
        </Route>
        <Route path="/privacy-policy">
          <PrivacyPolicy />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
