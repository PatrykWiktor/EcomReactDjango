import React from 'react'
import { Col, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ProductFeatured from './ProductFeatured'

function ProductsFeatured() {
    
    const productList = useSelector(state => state.productList)
    const { featuredProducts } = productList

    return (
        <div>
            <h1 className='hs-featured-prod' >Featured Products</h1>
            <Row >
                {featuredProducts.map(product => (
                    <Col  key={product._id} sm={12} md={6} lg={4} xl={4}>
                        <ProductFeatured product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ProductsFeatured
