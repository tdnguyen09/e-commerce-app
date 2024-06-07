import React from "react";
import Login from "./components/Login/Login";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";



function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
