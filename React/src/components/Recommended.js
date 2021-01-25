import React, { useState, useEffect } from 'react';
import axios from './axios';
import './main.css';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import ImageAxios from './ImageAxios';

const Recommended = () => {
    const history = useHistory();
    const [recommendedItems, setrecommendedItems] = useState([])

    useEffect(() => {
        axios.get('/recommended').then(res => {
            setrecommendedItems(res.data.data)
        })
    }, [])


    const getRecommendedProduct = (product) => {
        history.push({
            pathname: '/product',
            productData: product,
        });
    }

    return (
        <div>
            <div className="carddecks">
                {recommendedItems.map(item => (
                    <div key={item.imageId} onClick={() => getRecommendedProduct(item.groupId)}>
                        <div className="card Recommended__card text-center" >
                            <Card
                            className="card Recommended__cards"
                                style={{ width: "8rem" }}
                                cover={<img className="card-img-top img-fluid" src={ImageAxios()+item.productImagePath} alt={item.categoryName} />}
                            >
                                <p className="card-text CategoryRecommended__Name">{item.categoryName}</p>
                            </Card>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommended
