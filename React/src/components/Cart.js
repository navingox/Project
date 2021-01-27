import React, { useState, useEffect, useContext } from 'react'
import Bottombar from './Bottombar';
import axios from './axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { CartContext } from '../context/CartContext';
import './Cart.css';
import Bottom from './Bottom';
import { Row, Col } from 'antd';
import ImageAxios from './ImageAxios';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
    },
});


const Cart = () => {
    const classes = useStyles();
    const [orderedProducts, SetorderedProducts] = useState([]);
    const [refreshCart, SetrefreshCart] = useState("change");

    const [Item, setItem] = useContext(CartContext);


    const Prices = orderedProducts.map(o => {
        return parseInt(o.price);
    }).reduce(function (total, amount) {
        return total + amount;
    }, 0);



    useEffect(() => {
        getOrderProducts();

    }, [refreshCart]);

    const getOrderProducts = async () => {
        await axios.get("/orders").then(res => {
            console.log(res.data.data);
            SetorderedProducts(res.data.data);
            setItem(res.data.data.length);
        })

    }

    const handleDeleteCart = async (deleteImageId) => {
        await axios.delete(`/orders/deleteItems/${deleteImageId}`).then(res => {
            console.log(res.data.data);
            SetrefreshCart("refreshthecart");
            setItem(orderedProducts.length);
        }) 
    }


    const updateQunatity = async (UpdateProductId, Quantitycount, UpdatedPrice) => {

        const updateQunatityData = {
            UpdateProductId, Quantitycount, UpdatedPrice
        }

        await axios.post('/orders/updateQuantity', updateQunatityData).then(res => {
            console.log(res.data.data);
            getOrderProducts();
        })
    }

    const handleIncrement = (newQuantity_1, productid_1, Price1, OriginalPrice1) => {
        const NewPrice_1 = Price1 + OriginalPrice1;
        updateQunatity(productid_1, parseInt(newQuantity_1) + 1, NewPrice_1);
    }

    const handleDecrement = (newQuantity_2, productid_2, Price2, OriginalPrice2) => {
        if (newQuantity_2 == 1) {
            updateQunatity(productid_2, 1, parseInt(OriginalPrice2));
        } else {
            const NewPrice_2 = Price2 - OriginalPrice2;
            updateQunatity(productid_2, parseInt(newQuantity_2) - 1, NewPrice_2);
        }

    }

    return (
        <div>
            <h1>Cart Page</h1>
            <div className="cartTotalPrice" >
                      <h4>Items in Cart</h4>
                      <h4 className="rounded-pill">Total Price : ${Prices}</h4>
                </div>
            <div>
                <Row>
                    <Col className="text-center">
                        <div className="Cart__Responsive">
                        {
                            refreshCart && orderedProducts.map((order, index) => (
                                <div key={index} className="cartComponent">
                                    <Card title="Card title" style={{ width: "300px",height:"330px" }}>
                                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>

                                            <Button size="small" style={{ color: "red" }} onClick={() => handleDeleteCart(order.productId)}><i className="fa fa-trash fa-lg" aria-hidden="true"></i>&nbsp;Remove</Button>
                                        </div>
                                        <img src={ImageAxios()+order.productImagePath} alt={order.categoryName} />

                                        <div style={{padding:"8px"}}>
                                            <h5 size="small" color="primary">
                                               Price: ${order.price}
                                            </h5>
                                            
                                            <div style={{padding:"8px"}} >
                                            <Button variant="contained" size="small" onClick={() => handleDecrement(order.quantity, order.productId, order.price, order.originalPrice)}>
                                                -
                                            </Button>
                                            <Button>{order.quantity}</Button>
                                            <Button variant="contained" size="small" onClick={() => handleIncrement(order.quantity, order.productId, order.price, order.originalPrice)} >
                                                +
                                            </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        }
                        </div>
                    </Col>
                </Row>
               
                
            </div>
            <Bottom data={3} />
        </div>

    );
}

export default Cart;
