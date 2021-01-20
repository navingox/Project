import React,{useState,createContext} from 'react';

export const CartContext=createContext();


export const CartProvider=props=>{
    const[Item,setItem]=useState(0);
   
    return(
        <CartContext.Provider value={[Item,setItem]}>
            {props.children}
        </CartContext.Provider>
    )
}