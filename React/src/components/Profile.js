import React, { useState, useEffect } from 'react';
import axios from './axios';
import Bottombar from './Bottombar';
import './Profile.css';
import Bottom from './Bottom';

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
                  <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 htmlFor="name" className="m-2 w-25" style={{"display":"flex"}}>Name</h5>
                                    <input type="text" className="form-control m-2" id="name" name="name" value={data.name} required />
                                </div>
                                <div className="col-md-6">
                                    <h5 htmlFor="useremail" className="m-2"  style={{"display":"flex"}}>Email</h5>
                                    <input type="email" className="form-control m-2" id="useremail" name="useremail" value={data.email} required />
                                </div>
                                <div className="col-md-6">
                                    <h5 htmlFor="PhoneNumber" className="m-2"  style={{"display":"flex"}}>Phone Number</h5>
                                    <input type="text" className="form-control m-2" id="PhoneNumber" name="PhoneNumber" value={data.phoneNumber} required />
                                </div>
                                <div className="col-md-6">
                                    <h5 htmlFor="Address" className="m-2"  style={{"display":"flex"}}>Address</h5>
                                    <textarea type="text" className="form-control m-2" id="Address" name="Address" rows="5" cols="10" value={data.address} required />
                                </div>
                                <div className="col-md-6">
                                    <h5 htmlFor="Pincode" className="m-2"  style={{"display":"flex"}}>Pincode</h5>
                                    <input type="number" className="form-control m-2" id="Pincode" name="Pincode" value={data.pincode} required />
                                </div>

                            </div>
                            <div className="row p-4">
                                <div className="col-md-6">
                                    <button className="btn btn-primary rounded-pill" >Edit Profile</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            ))}
            <Bottom data={4}/>
        </div>
    )
}

export default Profile
