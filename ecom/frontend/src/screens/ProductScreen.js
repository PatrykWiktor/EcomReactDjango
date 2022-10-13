import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview, } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET, } from '../constants/productConstants'


function ProductScreen({ match, history }) {
    const [qty, setQTY] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        error: errorProductReview,
        loading: loadingProductReview,
        success: successProductReview
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(match.params.id))
        
        if (product.name) {
            document.title = product.name
        }


    }, [dispatch, match, successProductReview, product.name])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment,
        }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3' >Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} fluid />
                                </Col>
                                <Col className='text-center' md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Brand: {product.brand}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Category: {product.category}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3} >
                                    <Card className='trans-exclude'>
                                        <ListGroup variant='flush' className='text-center'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {product.countInStock > 0 && (
                                                <Row>
                                                    <Col>Quantity: </Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQTY(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            )}

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className="btn-block"
                                                    disabled={product.countInStock === 0}
                                                    type="button">Add</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>

                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.description}
                                    </ListGroup.Item>
                                </ListGroup>

                            </Row>
                            <Row>
                                <Col>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroupItem key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p className='text-left'>{review.createdAt.substring(0, 10)}</p>
                                                <p className='text-left'>{review.comment}</p>
                                            </ListGroupItem>
                                        ))}
                                        <ListGroupItem>
                                            <h4>Write a review</h4>
                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}

                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>PLease <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )
            }

        </div>
    )
}

export default ProductScreen
