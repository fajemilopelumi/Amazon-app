import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route} from "react-router-dom";
import { signout } from "./components/actions/useraction";
import CartScreen from "./components/screens/cartScreen";
import HomeScreen from "./components/screens/homeScreen";
import OrderScreen from "./components/screens/OrderScreen";
import PaymentMethodScreen from "./components/screens/PaymentMethodScreen";
import PlaceOrderScreen from "./components/screens/placeorderScreen";
import ProductScreen from "./components/screens/productScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ShippingAddressScreen from "./components/screens/shippingAddressScreen";
import SigninScreen from "./components/screens/signinScreen";
import OrderHistoryScreen from "./components/screens/orderHistoryScreen"
import ProfileScreen from "./components/screens/userProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProductListScreen from "./components/screens/ProductListScreen";
import AdminRoute from './components/screens/AdminRoute';
import ProductEditScreen from './components/screens/ProductEditScreen';
import OrderListScreen from "./components/screens/OrderListScreen";
const App = () => { 

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state)=> state.userSignin)
  const { userInfo } = userSignin;
  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>
     <>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="kindex.html">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">Cart {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}</Link>
            {
              userInfo ? (
                <div className="dropdown">
                <Link to ="/">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to='/orderhistory'>Order History</Link>
                  </li>
                  <li>
                  <Link to ="#signout" onClick= {signoutHandler}>
                    Sign Out
                  </Link>
                  </li>
                 
                </ul>
                </div>
              ): (
                <Link to="/signin">Sign In</Link>
              )
            }

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to ="#admin">Admin <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                  <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                  <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                  <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                  <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
         
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/cart/:id?" component={CartScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/shipping" component={ShippingAddressScreen} exact></Route>
          <Route path="/payment" component={PaymentMethodScreen} exact></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>
          <Route path="/order/:id" component={OrderScreen} exact></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen} exact></Route>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <PrivateRoute path="/profile" component={ProfileScreen} exact></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
        </main>
        <footer className="row center">All right researved</footer>
      </div>
    </>
    </BrowserRouter>
   
  );
};

export default App;
