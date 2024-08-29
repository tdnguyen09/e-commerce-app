import React, { useEffect, useState } from "react";
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
import Admin from "./components/Admin/Admin";
import Logout from "./components/Logout/Logout";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AddProduct from "./components/Add&UpdateProduct/AddProduct";
import UpdateProduct from "./components/Add&UpdateProduct/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import Checkout from "./components/Checkout/Checkout";
import Wishlist from "./components/Wishlist/Wishlist";



function App() {
  const [user, setUser] = useState(null)
  const [wishlistItems, setWishlistItems] = useState([])


  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/checksession').then((response) => {
      if(response.ok) {
        response.json().then(user => {
          setUser(user)
          setWishlistItems(wishlistItems)
        })
      }
    })
  },[])
  
  return (
    <div className="App">
      <Provider>
        <NavBar user={user} wishlistItems={wishlistItems} />
        <Switch>
          <Route path='/shopping-cart'>
            <ShoppingCart user={user}/>
          </Route>
          <Route path="/checkout">
            <Checkout user={user} />
          </Route>
          {user ? 
          <Route path="/logout">
            <Logout setUser={setUser} user={user} />
          </Route>
          :<Route path="/login">
            <Login setUser={setUser} setWishlistItems={setWishlistItems}/>
          </Route>}
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
            <Admin />
          </Route>
          <Route path='/admin-dashboard'>
            <AdminDashboard />
          </Route>
          <Route path='/add-new-product'>
            <AddProduct />
          </Route>
          <Route path='/update-product/:id'>
            <UpdateProduct />
          </Route>
          <Route path='/delete-product'>
            <DeleteProduct />
          </Route>
          <Route path="/products/:id">
            <ProductDetails user={user} setWishlistItems={setWishlistItems} wishlistItems={wishlistItems} />
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
