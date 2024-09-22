import React, { useContext, useEffect, useState } from "react";
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
import { Provider, WebContext } from "./components/WebContext";
import Admin from "./components/Admin/Admin";
import Logout from "./components/Logout/Logout";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AddProduct from "./components/Add&UpdateProduct/AddProduct";
import UpdateProduct from "./components/Add&UpdateProduct/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import Checkout from "./components/Checkout/Checkout";
import Wishlist from "./components/Wishlist/Wishlist";
import Preorder from "./components/ProductList/Preorder";
import Category from "./components/Categories/Categories";
import Clearance from "./components/ProductList/Clearance";
import OrderHistory from "./components/Logout/OrderHistory";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51PzFRpGa8Ef09n6h7efQUJBNIY4QElqHRnhooFVQnON2QHuWUT44vWXu45Y9YfclkAwRjfJR1uZe6RplYqG5gtcQ00sjbKatCq')


function App() {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] =useState(null)
  const [wishlistItems, setWishlistItems] = useState([]);
  
  
  useEffect(() => {
    fetch('https://final-project-database.onrender.com/checksession',{
      method:'GET',
      credentials:'include',
    })
    .then((response) => {
    // fetch('http://127.0.0.1:5000/checksession').then((response) => {
      if(response.ok) {
        response.json().then(user => {
          setUser(user)
          setWishlistItems(wishlistItems)
        })
      }
    })
  },[wishlistItems])
  return (
    <div className="App">
      <Provider userLoginID={user ? user.id : null} user={user}>
        <NavBar user={user} wishlistItems={wishlistItems} />
        <Switch>
          <Route path='/shopping-cart'>
            <ShoppingCart user={user}/>
          </Route>
          <Route path="/checkout">
            <Elements stripe={stripePromise}>
              <Checkout user={user} />
            </Elements>
          </Route>
          {user ? 
          <Route path="/logout">
            <Logout setUser={setUser} user={user} />
          </Route>
          :<Route path="/login">
            <Login setUser={setUser} setWishlistItems={setWishlistItems}/>
          </Route>}
          {user? 
          <Route path="/order-history">
            <OrderHistory user={user} />
          </Route> : null
          }
          <Route path="/signup">
            <Signup user={user} setUser={setUser} />
          </Route>
          <Route path='/wishlist'>
            <Wishlist user={user} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />
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
          <Route path='/admin'>
            <Admin setAdmin={setAdmin}/>
          </Route>
          {admin && (
          <Route path='/admin-dashboard'>
            <AdminDashboard admin={admin}/>
          </Route>
          )}
          {admin  && (
            <Route path='/add-new-product'>
              <AddProduct />
            </Route>
          )}
          {admin && (
          <Route path='/update-product/:id'>
            <UpdateProduct />
          </Route>
          )} 
          {admin && (    
          <Route path='/delete-product'>
            <DeleteProduct />
          </Route>
          )}
          <Route path="/products/:id">
            <ProductDetails user={user} setWishlistItems={setWishlistItems} wishlistItems={wishlistItems} />
          </Route>
          <Route exact path="/products">
            <ProductList />
          </Route>
          <Route path='/categories'>
            <Category />
          </Route>
          <Route path='/preorders'>
            <Preorder />
          </Route>
          <Route path='/clearance'>
            <Clearance />
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
