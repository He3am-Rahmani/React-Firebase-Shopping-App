import React from 'react'
import { Row,Col } from 'react-bootstrap'

import Products from '../../products'
import ProductComp from '../../components/Products/Products'
import './Home.css'

const Home = () => {
    return (
        <div id='product'>
         <h2 className='intro'>Products</h2>
            <Row>
                {Products.map((item)=>{
                    return(
                        <Col sm='12' md='6' lg='4' >
                            <ProductComp product={item} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Home
