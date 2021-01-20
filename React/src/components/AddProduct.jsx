import React, { useState, useEffect } from 'react';
import ColorPicker from 'material-ui-color-picker';
import axios from './axios';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {
  const history = useHistory();
  const [chooseImage, setchooseImage] = useState("");
  const [colorvalue, setcolorvalue] = useState('');
  const [categoryItems, SetcategoryItems] = useState([]);
  const [productValue, SetproductValue] = useState({
    categoryName: '',
    productName: '',
    groupId: '',
    price: '',
    productDescription: '',
  });

  useEffect(() => {
    axios.get('/category/getItems').then(res => {
      SetcategoryItems(res.data.data);
    })
  }, []);


  const handleProductChange = (e) => {
    SetproductValue({ ...productValue, [e.target.name]: e.target.value });
  }
  const handleImageChage = (e) => {
    setchooseImage(e.target.files[0]);
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('CategoryName', productValue.categoryName);
      productData.append('productName', productValue.productName);
      productData.append('categoryItems', "10+");
      productData.append('productDescription', productValue.productDescription);
      productData.append('price', productValue.price);
      productData.append('groupId', productValue.groupId);
      productData.append('imageColor', colorvalue);
      productData.append('photo', chooseImage)

      console.log({ productData });
      const productResponse = await axios.post('http://localhost:8000/addProduct', productData);
      console.log(productResponse);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div>
      <h1>Add Product Route</h1>
      <div className="container">

        <form onSubmit={onsubmit}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="categoryName" className="m-2">Category Name</label>
              <select onChange={handleProductChange} className="form-control m-2" name="categoryName" required>
                <option value="-1">Select Category Name</option>
                {
                  categoryItems.map((categoryItem, index) => (
                    <option key={index} value={categoryItem.categoryName} className="form-control m-2" >{categoryItem.categoryName}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="productName" className="m-2">Product Name</label>
              <input type="text" className="form-control m-2" onChange={handleProductChange} id="productName" name="productName" value={productValue.productName} required />
            </div>
          </div>


          <div className="row">
            <div className="col-md-4">
              <label htmlFor="groupId" className="m-2">Group ID</label>
              <input type="text" className="form-control m-2" onChange={handleProductChange} id="groupId" name="groupId" value={productValue.groupId} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="price" className="m-2">Price</label>
              <input type="text" className="form-control m-2" onChange={handleProductChange} id="price" name="price" value={productValue.price} required />
            </div>
            <div className="col-md-4 pt-2">
              <label className="m-2"><b>Choose Color(HEX Values)</b></label>
              <ColorPicker name='color' defaultValue='Your Color'
                value={colorvalue}
                onChange={color => setcolorvalue(color)}
              />
            </div>
          </div>


          <div className="row">
            <div className="col">
              <label htmlFor="ChooseImage" className="m-2">Choose Image</label>
              <input type="file" className="form-control m-2" id="ChooseImage" onChange={handleImageChage} required />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="productDescription" className="m-2">Product Description</label>
              <textarea type="text" className="form-control m-2" onChange={handleProductChange} id="productDescription" rows="5" cols="50" name="productDescription" value={productValue.productDescription} required ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col text-center">
              <button style={{ borderRadius: '20px !important' }} className="btn btn-success" >Add Product</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
