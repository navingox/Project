import React,{useState, useEffect}from 'react'
import "./Bottom.css";
import { NavLink } from 'react-router-dom';

const Bottom = (props) => {
  const [itemvalue,setItemvalue]=useState(0);
  const [navState,setNavState]=useState({
     homeCss:"navb",
     searchCss:"navb",
     cartCss:"navb",
     profileCss:"navb",
  })

  const [Whitecolor,setWhitecolor]=useState({
     homeWhite:{color:"white"},
     searchwhite:{color:"white"},
     cartWhite:{color:"white"},
     profilewhite:{color:"white"},
  })


    useEffect(()=>{
          setItemvalue(props.data);
    },[]);

     if(itemvalue===1){
      navState.homeCss="navb navbar__home";
     
     }else if(itemvalue===2){
      navState.searchCss="navb navbar__search";


     }else if(itemvalue===3){
      navState.cartCss="navb navbar__cart";


     }else if(itemvalue===4){
      navState.profileCss="navb navbar__profile";
    
     }
   

  return (
    <div className="Bottom__Container">
      <div className="navbar">
        <div className={navState.homeCss}>
          <NavLink to='/' style={{ "textDecoration": 'none' }}>
            <div className="tabs">
              <i className="fas fa-home homeicon"  style={ itemvalue ===1 ? { color:'white'} : {color : 'black'} }></i>
              <i className="home" >Home</i>
            </div>
          </NavLink>
        </div>
        <div className={navState.searchCss}>
          <NavLink to='/search' style={{ "textDecoration": 'none' }}>
            <div className="tabs">
              <i className="fas fa-search searchicon"  style={ itemvalue ===2 ? { color:'white'} : {color : 'black'} } ></i>
              <i className="search" >Search</i>
            </div>
          </NavLink>
        </div>
        <div className={navState.cartCss}>
          <NavLink to='/cart' style={{ "textDecoration": 'none' }} >
            <div className="tabs">
              <i className="fas fa-shopping-bag carticon" style={ itemvalue ===3 ? { color:'white'} : {color : 'black'} }  ></i>
              <i className="cart" >Cart</i>
            </div>
          </NavLink>
        </div>
        <div className={navState.profileCss}>
          <NavLink to='/profile' style={{ "textDecoration": 'none' }}>
            <div className="tabs">
              <i className="fas fa-user profileicon" style={ itemvalue ===4 ? { color:'white'} : {color : 'black'} } ></i>
              <i className="profile">Profile</i>
            </div>
          </NavLink>
        </div>
      </div>
    </div>

  )
}

export default Bottom
