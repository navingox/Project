import React from 'react'
import Category from './Category';
import Recommended from './Recommended';
import Bottom from './Bottom';
import './Home.css';
import { Divider } from 'antd';
import { AlignLeftOutlined, ScanOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';


const Home = () => {
    return (
        <div>

            <Row >
                <Col span={24} >
                    <div className="navitem">
                        <p><AlignLeftOutlined style={{ fontSize: '20px' }} /></p>
                        <p><ScanOutlined style={{ fontSize: '20px' }} />&nbsp;&nbsp; <b style={{ position: "relative", top: "4px", fontFamily: "DM Sans" }}>Scan</b> </p>
                    </div>
                </Col>
            </Row>


            <Divider className="Home__Title" orientation="left">Browse Category</Divider>

            <Row >
                <Col span={24} >
                    <Category />
                </Col>
            </Row>

            <Divider className="Home__Title" orientation="left">Recommendations</Divider>

            <Row >
                <Col span={24}>
                    <Recommended />
                </Col>
            </Row>

            <Bottom data={1} />
        </div>
    );
}

export default Home;


