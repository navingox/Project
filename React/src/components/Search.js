import React, { useState, useEffect, useRef } from 'react';
import axios from './axios';
import SearchBar from "material-ui-search-bar";
import Bottombar from './Bottombar';
import './main.css';
import Model from './Model';
import "./Modal.css";
import './Search.css';
import Bottom from './Bottom';

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


            <div className="container p-4">
                <div className="row">
                    <div className="col">
                        <SearchBar
                            value={searchValue.val}
                            placeholder="Search Products ..."
                            onChange={(newValue) => SetsearchValue({ val: newValue })}
                            onRequestSearch={(newValue) => fetchSearchResult({ val: newValue })}
                            style={{ borderRadius: "20px" }}
                        />
                    </div>
                </div>



                <div className="row p-4">
                    <div className="col">
                        <div className="SearchResultNumber">
                            {found && <h5 className="text-muted float-left">FOUND {searchResult.length} RESULTS</h5>}
                        </div>
                    </div>
                </div>


                <div className="row p-2">
                    <div className="col">
                    <div class="wrapper">
                        {searchResult.map(item => (
                            <div key={item.imageId} onClick={() => handleModal(item.groupId)}>
                                <div className="col">
                                    <div className="Search__Cards">
                                        <div className="card Search__card" style={{ width: "8rem" }}>
                                            <img className="card-img-top img-fluid rounded" src={item.productImagePath} alt={item.categoryName} />
                                            <div className="card-body">
                                                <p className="card-text CategoryRecommended__Name">{item.categoryName}</p>
                                                <p className="card-text">$ {item.price}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                <Model ref={modalRef}></Model>
            </div>
            <Bottom data={2} />
        </div>
    );
}

export default Search;
