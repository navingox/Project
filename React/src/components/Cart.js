import React, { useState, useEffect, useContext } from 'react'
import Bottombar from './Bottombar';
import axios from './axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CartContext } from '../context/CartContext';
import './Cart.css';
import Bottom from './Bottom';

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
            <h4>Items in Cart</h4>
            <div className="container p-2">
                <div className="row ">
                    <div className="col text-center">
                        {
                            refreshCart && orderedProducts.map((order, index) => (
                                <div key={index} className="cartComponent">
                                    <Card className={classes.root}>
                                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>

                                            <Button size="small" style={{ color: "red" }} onClick={() => handleDeleteCart(order.productId)}><i className="fa fa-trash fa-lg" aria-hidden="true"></i>&nbsp;Remove</Button>
                                        </div>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt={order.productName}
                                                height="100%"
                                                image={order.productImagePath}
                                                title={order.productName}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {order.productName}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Price: ${order.price}
                                            </Button>

                                            <Button variant="contained" size="small" onClick={() => handleDecrement(order.quantity, order.productId, order.price, order.originalPrice)}>
                                                -
                                            </Button>
                                            <Button>{order.quantity}</Button>
                                            <Button variant="contained" size="small" onClick={() => handleIncrement(order.quantity, order.productId, order.price, order.originalPrice)} >
                                                +
                                            </Button>

                                        </CardActions>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <h1 className="btn btn-success rounded-pill p-2 mt-5">Total Price : ${Prices}</h1>
                <div className="cartTotal" >
                </div>
            </div>
            <Bottom data={3} />
        </div>

    );
}

export default Cart;
