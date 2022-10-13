import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'

function OrderListScreen({ history }) {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [keyword, setKeyword] = useState()
    const [sortBy, setSortBy] = useState('User')

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if (userInfo && userInfo.isAdmin) {
            history.push(`/admin/orderlist/?keyword=${keyword}&sortBy=${sortBy}`)
            dispatch(listOrders(keyword, sortBy))
        } else {
            history.push('/login')
        }
    }

    return (
        <div>
            <h1>Orders</h1>
            <Row className='my-3'>
                <Col>
                    <h4>Search</h4>
                </Col>
                <Col sm={8}>
                    <Form onSubmit={submitHandler} inline >
                        <Col>
                            <Form.Control
                                type='input'
                                name='q'
                                onChange={(e) => setKeyword(e.target.value)}
                                className='mr-sm-2 ml-sm-5'
                                placeholder="Search..."
                            >
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Group className='mr-3'>
                                <Form.Label>Search by</Form.Label>
                                <Form.Control onChange={(e) => setSortBy(e.target.value)} as="select">
                                    <option>User</option>
                                    <option>Order ID</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                    </Form>
                </Col>
                <Col>
                    <Button onClick={submitHandler} variant="outline-primary">Search</Button>{' '}
                </Col>

            </Row>
            <Row>
                {loading
                    ? (<Loader />)
                    : error
                        ? (<Message variant='danger'>{error}</Message>)
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user && order.user.name}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <i className='fa fa-times' style={{ color: 'red' }}></i>
                                            )}
                                            </td>

                                            <td>{order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : (
                                                <i className='fa fa-times' style={{ color: 'red' }}></i>
                                            )}
                                            </td>

                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        Details
                                                </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Row>
        </div>
    )
}

export default OrderListScreen
