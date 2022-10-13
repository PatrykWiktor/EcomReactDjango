import React, { useEffect, useRef,useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen({ history, match }) {
    const dispatch = useDispatch()
    
    // eslint-disable-next-line
    const [keyword, setKeyword] = useState('')
    // eslint-disable-next-line
    const [sortBy, setSortBy] = useState('')

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderBy = useRef('Ascending')

    let query = history.location.search

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if ((userInfo && !userInfo.isAdmin) || !userInfo) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(query))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, query])

    const deleteHandler = (id) => {
        if (window.confirm('U sure u want to delete this product ?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const switchOrder = () => {
        if (!loading) {
            if (orderBy.current === 'Ascending') {
                orderBy.current = 'Descending'
            } else {
                orderBy.current = 'Ascending'
            }
        }
    }

    const sortToggle = (e) => {
        e.preventDefault()
        if (!loading) {
            const sortingTarget = e.target.innerText.toUpperCase()

            if (userInfo && userInfo.isAdmin) {
                switchOrder()
                history.push(`/admin/productlist/?keyword=&page=1&sortBy=${sortingTarget}&orderBy=${orderBy.current}`)
                dispatch(listProducts(query))
            }
            else {
                history.push('/login')
            }
        }
    }
    // TODO
    const submitHandler=(e)=>{
        e.preventDefault()
        alert("Not Implemented, should work the same way as user filter");
    }

    return (
        <div>
            <Row className='align-items-center'>

                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 ' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>  Create Product
                    </Button>
                </Col>

            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th className='cursor-pointer' onClick={sortToggle}>ID</th>
                                        <th className='cursor-pointer' onClick={sortToggle}>NAME</th>
                                        <th className='cursor-pointer' onClick={sortToggle}>PRICE</th>
                                        <th className='cursor-pointer' onClick={sortToggle}>CATEGORY</th>
                                        <th className='cursor-pointer' onClick={sortToggle}>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} query={query} />
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen
