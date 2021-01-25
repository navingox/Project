import React, { useState, useEffect } from 'react';
import axios from './axios';
import Bottombar from './Bottombar';
import './Profile.css';
import Bottom from './Bottom';
import { Row, Col } from 'antd';
import { Input } from 'antd';

const Profile = () => {
    const [ProfileData, setProfileData] = useState([]);

    useEffect(() => {
        getUserProfileDetails();
    }, []);


    const getUserProfileDetails = async () => {
        await axios.get("/profile").then(res => {
            console.log(res.data.data);
            setProfileData(res.data.data);
        })
    }

    return (
        <div>
            <h1>Profile</h1>
            {ProfileData.map((data, index) => (
                <div key={index}>
                    <form className="p-2">
                        <div>
                            <Row justify="center">
                                <Col span={24}>
                                    <h5 htmlFor="name" >Name</h5>
                                    <input type="text" className="form-control" id="name" name="name"  value={data.name}  required />
                                    
                                    <h5 htmlFor="useremail" >Email</h5>
                                    <input type="email" className="form-control" id="useremail" name="useremail" value={data.email} required />


                                    <h5 htmlFor="PhoneNumber"   >Phone Number</h5>
                                    <input type="text" className="form-control" id="PhoneNumber" name="PhoneNumber" value={data.phoneNumber} required />

                                    <h5 htmlFor="Address"   >Address</h5>
                                    <textarea type="text" className="form-control" id="Address" name="Address" rows="5" cols="10" value={data.address} required />

                                    <h5 htmlFor="Pincode"   >Pincode</h5>
                                    <input type="number" className="form-control" id="Pincode" name="Pincode" value={data.pincode} required />
                                </Col>

                            </Row>

                            <Row justify="center" className="p-2">
                                <Col span={12}>
                                    <button className="btn btn-primary rounded-pill" >Edit Profile</button>
                                </Col>
                            </Row>
                        </div>
                    </form>

                </div>
            ))}
            <Bottom data={4} />
        </div>
    )
}

export default Profile
