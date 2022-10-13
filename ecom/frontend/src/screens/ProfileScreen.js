import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table, Tab, Tabs } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { saveShippingAddress } from '../actions/cartActions'

function ProfileScreen({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [key, setKey] = useState('User Profile');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const { address: savedAddress, city: savedCity, postalCode: savedPostalCode, country: savedCountry } = shippingAddress

    

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
                setCity(savedCity)
                setAddress(savedAddress)
                setPostalCode(savedPostalCode)
                setCountry(savedCountry)
            }
        }
    }, [history, userInfo, dispatch, user, success, key, savedCity, savedAddress, savedPostalCode, savedCountry])


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }

    const submitShippingAdressHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
    }

    return (
        <div>
            <Row>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="User Profile" title="User Profile">
                    </Tab>
                    <Tab eventKey="My Orders" title="My Orders">
                    </Tab>
                    <Tab eventKey="My Saved Adress" title="My Saved Adress">
                    </Tab>
                </Tabs>
            </Row>
            <Row >
                {key === 'User Profile' &&
                    <Col md={3}>
                        <h2>User Profile</h2>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type='name'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Adress</Form.Label>
                                <Form.Control
                                    required
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='enter password'
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='passwordComfirm'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' varian='primary'>
                                Update
                    </Button>
                        </Form>
                    </Col>
                }
                {key === 'My Orders' &&
                    <Col>
                        <h2>My Orders</h2>
                        {loadingOrders ? (
                            <Loader />
                        ) : errorOrders ? (
                            <Message variant='danger'>{errorOrders}</Message>
                        ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                }

                {key === 'My Saved Adress' &&
                    <div>
                        <h2>Saved Address</h2>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitShippingAdressHandler}>

                            <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='city'>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Enter City'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='postalCode'>
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Postal Code'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='country'>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Country'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' varian='primary'>
                                Update
                             </Button>
                        </Form>

                    </div>

                }
            </Row>
        </div >
    )
}

export default ProfileScreen
