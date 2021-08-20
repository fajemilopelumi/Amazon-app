import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import HomeScreen from "./components/screens/homeScreen";
import ProductScreen from "./components/screens/productScreen";
const App = () => {
  return (
    <BrowserRouter>
     <>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="kindex.html">
              amazona
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
         
        </main>
        <footer className="row center">All right researved</footer>
      </div>
    </>
    </BrowserRouter>
   
  );
};

export default App;
