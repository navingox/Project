import React ,{useContext}from 'react'
import { NavLink } from 'react-router-dom';
import './main.css';
import {CartContext} from '../context/CartContext';

const Bottombar = () => {

    const[Item,setItem]=useContext(CartContext);

    return (
        <div className="mycontainer">
            <div className="container">
                <div className="row ">
                   <nav className="tab-content navbar">
        
                        <div className="tab">
                            <NavLink activeClassName="navbar__link--active" to='/' style={{ "textDecoration": 'none'}}>
                               <i className="fas fa-home" ></i>
                               <p>Home</p>
                            </NavLink>
                        </div>
                        <div className="tab">
                            <NavLink to='/search' style={{ "textDecoration": 'none'}}>
                               <i className="fas fa-search" ></i>
                               <p>Search</p>
                            </NavLink>
                        </div>
                        <div className="tab">
                            <NavLink to='/cart' style={{ "textDecoration": 'none'}} >
                            <i className="fas fa-shopping-bag "></i>
                            <p>Cart <span className="CartIconRound" >{Item}</span></p>
                            </NavLink>
                        </div>
                        <div className="tab">
                            <NavLink to='/profile' style={{ "textDecoration": 'none'}}>
                            <i className="fas fa-user" ></i>
                            <p>Profile</p>
                            </NavLink>
                        </div>
                      
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Bottombar
