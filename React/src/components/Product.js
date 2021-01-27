import React, { useState, useEffect, useContext } from 'react';
import axios from './axios';
import Bottombar from './Bottombar';
import './main.css';
import { useHistory } from 'react-router-dom';
import ReactJsAlert from "reactjs-alert";
import { CartContext } from '../context/CartContext';
import './Modal.css';
import ImageAxios from './ImageAxios';

const Product = (props) => {
    const [productData, SetproductData] = useState([]);
    const [imageData, SetimageData] = useState(0);
    const history = useHistory();
    const [whenAdded, SetwhenAdded] = useState(false);
    const [Item, setItem] = useContext(CartContext);


    useEffect(() => {
        getProducts();
    }, [])



    const getProducts = async () => {
        axios.get(`/product/${props.location.productData}`).then(res => {
            console.log(res.data.data);
            SetproductData(res.data.data);
        })
    }

    const handleImageChange = (image) => {
        SetimageData(image);
    }

    const handleBack = () => {
        history.push({
            pathname: '/',
        });
    }

    const handleCartEvent = async (indexData )=> {
        
        const orderData = productData[indexData];

        await axios.post("/orders/addToCart", { orderData }).then(res => {
            console.log(res.data);
            SetwhenAdded(true);
        })

        setItem(Item + 1);
    }

    const handleCart = () => {
        history.push('/cart');
    }
    return (
        <div>
            <div className="container p-2 Modal__nav">
                <div className="row">
                    <div className="col">
                        <div className="navitem">
                            <p onClick={handleBack}><i className="fas fa-arrow-left fa-lg" ></i></p>
                            <p onClick={handleCart}><i className="fas fa-shopping-bag fa-lg"></i>{Item}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                                {productData.map((item, index) => {
                                    if (index === imageData) {
                                        return (
                                            <div className="Model__MainDiv" key={item.imageId}>
                                                <div className="container">
                                                    <div className="row">
                                                         <div className="MainContainer">
                                                                  <p className="Model__CategoryName">{item.categoryName}</p>
                                                                    <h4 className="Model__Productname"><b>{item.productName}</b></h4>
                                                                    <p className="Model__From">FROM</p>
                                                                    <p className="Model__Price">$ {item.price}</p>
                                                                    <p className="Model__availableColors">Available colors</p>
                                                                    <div className="Model__Colors">
                                                                    {productData.map((i, index) => (
                                                                            <div key={index} className="maindot p-1">
                                                                                <span className="dot" style={{ backgroundColor: i.imageColor }} onClick={() => handleImageChange(index)} ></span>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                             <div className="ImageContainer">
                                                             <img src={ImageAxios()+item.productImagePath} className="img-fluid" alt="Responsive image" />
                                                             </div>
                                                         
                                                         </div>

                                                        <div className="Model__DescMain">
                                                            <h4 className="card-text Model_DescriptionTitle" style={{ display: "flex" }}>Description</h4>
                                                            <p className="Model__Description"> {item.productDescription}</p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="container p-4">
                                                    <div className="row">
                                                        <div className="col text-center">
                                                            <button className="form-control rounded-pill text-center text-white" style={{ backgroundColor: "#8A2BE2", height: "50px" }} onClick={() => handleCartEvent(index)} ><b>ADD TO CART</b></button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        )
                                    }
                                })}
                            </div>
            {
                whenAdded && <ReactJsAlert
                    type="success"
                    title="Hey! Your Product is Added to Cart"
                    status={true}
                    button="Okay"
                    color="#1d36ad"
                    quote="Do Check Your Item in Cart"
                    Close={() => SetwhenAdded(false)}
                />
            }

            {/* <Bottombar /> */}
        </div>
    );
}

export default Product;
