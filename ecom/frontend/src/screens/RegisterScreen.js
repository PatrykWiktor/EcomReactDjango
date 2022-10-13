import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({ location, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [altMessage, setAltMessage] = useState('')


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        setAltMessage('')
        setMessage('')
        
        if(name.length < 3 || password.length < 8 || password !== confirmPassword){
            if (name.length <3){
                setMessage('Name is shorter then 3 characters')
            }
            if(password.length < 8){
                setAltMessage('Password is shorter then 8 characters')
            }else if (password !== confirmPassword) {
                setAltMessage('Password do not match')
            }
        }else {
            dispatch(register(name, email, password))
        }
    }


    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {altMessage && <Message variant='danger'>{altMessage}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Must be at least 3 characters long.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        required
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
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    >
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Must be at least 8 characters long.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId='passwordComfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>



                <Button type='submit' varian='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Got an account ?
                    <LinkContainer to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        <Button className='ml-3' variant="outline-primary">Log in</Button>
                    </LinkContainer>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
