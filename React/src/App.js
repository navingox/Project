import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddProduct from './components/AddProduct';
import Search from './components/Search';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Product from './components/Product';
import Items from './components/Items';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/items" component={Items} />
          <Route path="/product" component={Product} />
          <Route path="/profile" component={Profile} />
          <Route path="/cart" component={Cart} />
          <Route path="/add" component={AddProduct} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
