import React, { useState, useEffect } from 'react'
import { Button, Col,Form, } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { updateCategory, updateBrand, updateFilter } from '../actions/searchboxActions'
import { SEARCHBOX_CATEGORY_RESET, SEARCHBOX_BRAND_RESET } from '../constants/searchboxConstants'

function ProductSideFilter() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('NAME')
    const [order, setOrder] = useState('Ascending')

    const productList = useSelector(state => state.productList)
    const { catAndBrand } = productList

    const keywordState = useSelector(state => state.keyword.keyword.keyword)
    const categoryState = useSelector(state => state.category.category.category)
    const brandState = useSelector(state => state.brand.brand.brand)
    const { sortBy, orderBy } = useSelector(state => state.filter)

    function sort(e) {
        e.preventDefault()

        history.push(`/?keyword=${keyword && keyword}&page=1${category && '&cat=' + category}${brand && '&brand=' + brand}${sortBy && '&sortBy=' + sortBy}${orderBy && '&orderBy=' + orderBy}`)

    }


    useEffect(() => {
        dispatch(updateFilter(type, order))
    }, [dispatch,type, order])

    useEffect(() => {
        if (category) {
            if (category === 'allcat') {
                setCategory('')
                dispatch({ type: SEARCHBOX_CATEGORY_RESET })
            } else {
                dispatch(updateCategory(category))
            }
        }
        if (category !== categoryState && (brand || brandState)) {
            dispatch({ type: SEARCHBOX_BRAND_RESET })
            setBrand()
        }
    }, 
    // eslint-disable-next-line
    [dispatch,category])

    useEffect(() => {
        if (brand) {
            if (brand === 'allbrand') {
                setBrand('')
                dispatch({ type: SEARCHBOX_BRAND_RESET })
            } else {
                dispatch(updateBrand(brand))
            }
        }

    }, [dispatch, brand])

    useEffect(() => {

        if (categoryState === undefined && !category) {
            setCategory('')
        } else if (!category && categoryState !== undefined) {
            setCategory(categoryState)
        } else if (category && category !== categoryState && categoryState !== undefined) {
            setCategory(categoryState)
        }

        if (brandState === undefined && !brand) {
            setBrand('')
        } else if (!brand && brandState !== undefined) {
            setBrand(brandState)
        } else if (brand && brand !== brandState && brandState !== undefined) {
            setBrand(brandState)
        } else if (brand && brand !== brandState && brandState === undefined) {
            setBrand('')
        }

        if (keywordState === undefined && !keyword) {
            setKeyword('')
        } else if (!keyword && keywordState !== undefined) {
            setKeyword(keywordState)
        } else if (keyword && keyword !== keywordState && keywordState !== undefined) {
            setKeyword(keywordState)
        }


    }, 
    // eslint-disable-next-line
    [categoryState, brandState, keywordState])

    return (
        <div className='product-filter-side'>

            <Form>
                <Col className='product-filter-side-catbrand'>
                    <Form.Group className='product-filter-side-cat' onChange={(e) => setCategory(e.target.id)} >

                        <Form.Row className='my-3 mt-5'>
                            <strong><h4>Categories</h4></strong>
                        </Form.Row>
                        <Form.Row>
                            <Form.Check
                                type='radio'
                                id='allcat'
                                name='category-radio'
                                label='All Categories'
                                defaultChecked={!category ? true : false}
                            />
                        </Form.Row>
                        {Object.entries(catAndBrand).map(item => (
                            <Form.Row key={item[0]} className='my-2'>

                                <Form.Check
                                    type='radio'
                                    id={item[0]}
                                    name='category-radio'
                                    label={item[0]}
                                    defaultChecked={category === item[0] ? true : false}
                                />

                            </Form.Row>
                        ))}

                    </Form.Group>

                    <Form.Group onChange={(e) => setBrand(e.target.id)} >

                        {Object.entries(catAndBrand).map(item => (
                            <div key={item}>
                                {item[0] === category
                                    &&
                                    <div >
                                        <Form.Row className='my-3'>
                                            <strong><h4>Brands</h4></strong>
                                        </Form.Row>
                                        <Form.Row>

                                            <Form.Check
                                                type='radio'
                                                id='allbrand'
                                                name='brand-radio'
                                                label='All brands'
                                                defaultChecked={!brand ? true : false}
                                            />


                                        </Form.Row>
                                        {item[1].map(Brand => (
                                            <Form.Row key={Brand} className='my-2'>

                                                <Form.Check
                                                    type='radio'
                                                    id={Brand}
                                                    name='brand-radio'
                                                    label={Brand}
                                                    defaultChecked={Brand === brand ? true : false}
                                                />

                                            </Form.Row>
                                        ))}

                                    </div>
                                }
                            </div>
                        ))}

                    </Form.Group>
                </Col>
            </Form>
            <Form onSubmit={sort} className='form-inline'>
                <Col>
                    <Form.Row className='mt-2'>
                        <strong><h4>Sort</h4></strong>
                    </Form.Row>
                    <Form.Row>
                        <Form.Control onChange={(e) => setType(e.target.value.toUpperCase())} className='mt-1' size='sm' as="select">
                            <option>Name</option>
                            <option>Price</option>
                        </Form.Control>
                    </Form.Row>
                    <Form.Row>
                        <Form.Control onChange={(e) => setOrder(e.target.value)} className='mt-1 ' size='sm' as="select">
                            <option>Ascending</option>
                            <option>Descending</option>
                        </Form.Control>
                    </Form.Row>
                    <Form.Row>
                        <Button
                            type='submit'
                            variant='outline-primary'
                            className='mt-1'
                            size='sm'
                        >
                            Filter
                    </Button>
                    </Form.Row>
                </Col>
            </Form>
        </div>
    )
}

export default ProductSideFilter

// Backlog
// If categories share a brand, changing between them doesnt update shared brand on first rerender
