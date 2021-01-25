import React, { useEffect, useState } from 'react'
import axios from './axios';
import { useHistory } from 'react-router-dom';
import ImageAxios from './ImageAxios';
import './Category.css';

function Category() {
  const [categoryItems, setCategoryItems] = useState([])
  const history = useHistory();
   
  useEffect(() => {
    axios.get('/category').then(res => {
      setCategoryItems(res.data.data)
    })
  }, [])

  const getCategoryProduct = (data) => {
    history.push({
      pathname: '/items',
      productData: data,
    });
  }

  return (

    <div className="carddecks">

      {categoryItems.map(item => (
        <div className="maincontainer" key={item.categoryId}>
          <div className="main">

            <div className="one" key={item.categoryId} onClick={() => getCategoryProduct(item.categoryName)}>
              <div className="imge">
                <img className="myimage" src={ImageAxios()+item.imagePath} alt={item.categoryName} />
                <p className="CategoryRecommended__Name" >{item.categoryName}</p>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;

