import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

import FeatureCarousel from '../components/FeatureCarousel'
import ProductsFeatured from '../components/ProductsFeatured'
import ProductSideFilter from '../components/ProductSideFilter'


import { listProducts } from '../actions/productActions'
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'

function HomeScreen({ history }) {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    let query = history.location.search


    useEffect(() => {
        document.title = 't-id.com - Computer shop'
        dispatch(listProducts(query))

        dispatch({ type: PRODUCT_DETAILS_RESET })


    }, [dispatch, query,])


    return (
        <div>
            
            <Row>
                {query && <Col md={2}>
                    <ProductSideFilter/>
                </Col>}
                
                <Col >

                    {!query && <FeatureCarousel />}
                    {loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            :
                            <div>

                                {!query && <ProductsFeatured />}

                                {query ? ''
                                    :
                                    <div className='hs-latest-prod'>
                                        <h2>Latest Products</h2>
                                    </div>
                                }
                                <Row>

                                    {products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate page={page} pages={pages} query={query}  />
                            </div>
                    }
                </Col>
            </Row>

        </div>
    )
}

export default HomeScreen
