import React, { useState, useEffect,useContext } from 'react';
import axios from './axios';
import { useHistory } from 'react-router-dom';
import "./main.css"
import { CartContext } from '../context/CartContext';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import ImageAxios from './ImageAxios';
import "./Items.css";

const Items = (props) => {
    const [productData, SetproductData] = useState([]);
    const history = useHistory();

    const [Item, setItem] = useContext(CartContext);
    useEffect(() => {
        getProducts();
    }, [])


    const getProducts = async () => {
        axios.get(`/category/get/${props.location.productData}`).then(res => {
            console.log(res.data.data);
            SetproductData(res.data.data);
        })
    }

    const getSpecificProduct = (product) => {
        history.push({
            pathname: '/product',
            productData: product,
        });
    }

    const handleBack = () => {
        history.push({
            pathname: '/',
        });
    }

    const handleCart = () => {
        history.push('/cart');
    }

    return (
        <div>

            <div>
                <Row>
                    <Col span={24} >
                        <div className="navitem">
                            <h6 onClick={handleBack}><i className="fas fa-arrow-left fa-lg" ></i></h6>
                            <h6 className="CategoryRecommended__bannerProductName">{props.location.productData}  Products</h6>
                            <h6 onClick={handleCart}><i className="fas fa-shopping-bag fa-lg"></i></h6>
                        </div>
                    </Col>
                </Row>


                <Row justify="center">
                         <div className="mywrapper">
                        {productData.map(item => (
                        <div key={item.imageId} onClick={() => getSpecificProduct(item.groupId)}>
                               <Col span={24}>
                                    <div className="Item__Cards">
                                    <Card
                                        className="Item__cards"
                                            hoverable
                                            style={{ width: "8rem" }}
                                            cover={<img src={ImageAxios()+item.productImagePath} alt={item.categoryName} />}
                                        >
                                            <p className="card-text CategoryRecommended__Name">{item.categoryName}</p>
                                            <p className="card-text">$ {item.price}</p>
                                        </Card>
                                    </div>
                                </Col>
                            </div>
                    ))}

                    </div>
                </Row>


            </div>

            
        </div>
    );
}

export default Items;
