import React, { useEffect, useState, useRef } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'


function UserListScreen({ history }) {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const [keyword, setKeyword] = useState('')
    const [sortBy, setSortBy] = useState('ID')

    const orderBy = useRef('Asc')

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if (userInfo && userInfo.isAdmin) {
            history.push(`/admin/userlist/?keyword=${keyword}&sortBy=${sortBy}&orderBy=${orderBy.current}`)
            dispatch(listUsers(keyword, sortBy,orderBy.current))
        } else {
            history.push('/login')
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('U sure u want to delete this user ?')) {
            dispatch(deleteUser(id))
        }
    }
    const switchOrder = () =>{
        if (orderBy.current ==='Asc'){
            orderBy.current = 'Desc'
        }else{
            orderBy.current ='Asc'
        }
    }

    const sortToggle = (e) => {
        e.preventDefault()
        
        const sortingTarget = e.target.innerText.toUpperCase()

        if (userInfo && userInfo.isAdmin) {
            switchOrder()
            history.push(`/admin/userlist/?keyword=${keyword}&sortBy=${sortingTarget}&orderBy=${orderBy.current}`)
            dispatch(listUsers(keyword, sortingTarget, orderBy.current))
        }
        else {
            history.push('/login')
        }
    };

    return (
        <div>
            <h1>Users</h1>
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
                            <Form.Group >
                                <Form.Label className='mr-3'>Search By</Form.Label>
                                <Form.Control onChange={(e) => setSortBy(e.target.value.toUpperCase())} as="select">
                                    <option>ID</option>
                                    <option>Name</option>
                                    <option>Email</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                    </Form>
                </Col>
                <Col>
                    <Button onClick={submitHandler} variant="outline-primary">Search</Button>{' '}
                </Col>

            </Row>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th onClick={sortToggle}>ID</th>
                                    <th onClick={sortToggle}>NAME</th>
                                    <th onClick={sortToggle}>EMAIL</th>
                                    <th onClick={sortToggle}>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fa fa-times' style={{ color: 'red' }}></i>
                                        )}
                                        </td>
                                        <td className='text-center'>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen
