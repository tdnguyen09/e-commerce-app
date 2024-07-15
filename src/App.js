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
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Provider } from "./components/WebContext";



function App() {
  return (
    <div className="App">
      <Provider>
        <NavBar />
        <Switch>
          <Route path='/shopping-cart'>
            <ShoppingCart />
          </Route>
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
          <Route path="/products/:id">
            <ProductDetails />
          </Route>
          <Route exact path="/products">
            <ProductList />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
