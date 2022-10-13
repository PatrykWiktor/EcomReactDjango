import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            <Alert variant="info">
                <Alert.Heading className='text-center'>Default Accounts</Alert.Heading>
                <br />
                <p>
                    Login: admin@email.com
                    <br />
                    Password: adminpass123
                    <hr />
                    Login: user@email.com
                    <br />
                    Password: userpass123
                </p>

            </Alert>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' varian='primary'>Submit</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Are you new user ?
                    <LinkContainer to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        <Button className='ml-3' variant="outline-primary">Register</Button>
                    </LinkContainer>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
