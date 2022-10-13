import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function FeatureCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Carousel pause='hover' >

                        <Carousel.Item className='first-slide'>
                            <img

                                src="/images/features_1.png"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h1>Thats Some Feature !</h1>
                                <p>And rather short, but on point, description.</p>
                                <Button><strong>See More !</strong></Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img

                                src="/images/features_2.png"
                                alt="Sec slide"
                            />
                            <Carousel.Caption className='second-slide'>
                                <h1>Thats Some Feature !</h1>
                                <p>And rather short, but on point, description.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img

                                src="/images/features_3.png"
                                alt="Sec slide"
                            />
                            <Carousel.Caption className='third-slide'>
                                <h1>Thats Some Feature !</h1>
                                <Button><strong>See More !</strong></Button>
                            </Carousel.Caption>
                        </Carousel.Item>

                    </Carousel>

                )


    )
}

export default FeatureCarousel
