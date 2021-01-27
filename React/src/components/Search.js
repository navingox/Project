import React, { useState, useEffect, useRef } from 'react';
import axios from './axios';
import SearchBar from "material-ui-search-bar";
import './main.css';
import Model from './Model';
import "./Modal.css";
import './Search.css';
import Bottom from './Bottom';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import ImageAxios from './ImageAxios';

const Search = () => {
    const [searchValue, SetsearchValue] = useState('');
    const [searchResult, SetsearchResult] = useState([]);
    const [found, Setfound] = useState(false);

    const modalRef = useRef();

    const fetchSearchResult = (e) => {
        getSearchResult();
    }

    useEffect(() => {
        getSearchResult();
    }, [searchValue]);

    const getSearchResult = async () => {
        axios.get(`/search/${searchValue.val}`).then(res => {
            console.log(res.data.data);
            SetsearchResult(res.data.data);
            Setfound(true);
        })
    }

    const handleModal = (val) => {
        modalRef.current.call(val);
        modalRef.current.open();
    }

    return (
        <div>


            <div style={{ padding: "20px" }} >
                <Row justify="center">
                    <Col span={24} >
                        <SearchBar
                            value={searchValue.val}
                            placeholder="Search Products ..."
                            onChange={(newValue) => SetsearchValue({ val: newValue })}
                            onRequestSearch={(newValue) => fetchSearchResult({ val: newValue })}
                            style={{ borderRadius: "20px" }}
                        />
                    </Col>
                </Row>



                <Row style={{ padding: "20px" }}>
                    <Col span={24} >
                        <div className="SearchResultNumber">
                            {found && <h5 className="text-muted float-left">FOUND {searchResult.length} RESULTS</h5>}
                        </div>
                    </Col>
                </Row>

 
                <Row justify="center" style={{ padding: "20px" }}>
                    <Col span={24} >
                        <div className="wrapper">
                            {searchResult.map(item => (
                                <div key={item.imageId} onClick={() => handleModal(item.groupId)}>
                                    <div className="Search__Cards">
                                        <Card
                                            className="Search__cards"
                                            hoverable
                                            style={{ width: "8rem" }}
                                            cover={<img src={ImageAxios()+item.productImagePath} alt={item.categoryName} />}
                                        >
                                            <p className="card-text CategoryRecommended__Name">{item.categoryName}</p>
                                            <p className="card-text">$ {item.price}</p>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Model ref={modalRef}></Model>
            </div>
            <Bottom data={2} />
        </div>
    );
}

export default Search;
