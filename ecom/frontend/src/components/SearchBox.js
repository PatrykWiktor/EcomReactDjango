import React, { useState, useEffect } from 'react'
import { Button,Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateKeyword, updateCategory } from '../actions/searchboxActions'
import { SEARCHBOX_BRAND_RESET } from '../constants/searchboxConstants'


function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState('')

    const productList = useSelector(state => state.productList)
    const { catAndBrand } = productList

    const brandState = useSelector(state => state.brand.brand.brand)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (category === 'All Categories') {
            setCategory('')
        }

    }, [category]);


    const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(updateKeyword(keyword))
        dispatch(updateCategory(category))
        
        if(brandState){
            dispatch({type:SEARCHBOX_BRAND_RESET})
        }
        keyword || category
            ? history.push(`/?keyword=${keyword}&page=1${category && '&cat=' + category}`)
            : history.push(`/`)
    }

    return (
        <div className='Searchbar'>
            <Form onSubmit={submitHandler} inline >

                <Form.Control
                    type='input'
                    name='keyword input'
                    onChange={(e) => setKeyword(e.target.value)}
                    className='mr-sm-2 ml-sm-4'
                    placeholder={'Search...'}
                    value={keyword}

                >
                </Form.Control>
                <Form.Control
                    className='mr-sm-2 ml-sm-4'
                    as="select"
                    size='sm'
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option>All Categories</option>
                    {catAndBrand && Object.entries(catAndBrand).map(item => (
                        <option key={item[0]}>{item[0]}</option>
                    ))}

                </Form.Control>
                <Button
                    type='submit'
                    variant='outline-primary'
                    className='ml-3'
                    size='sm'
                >Search
                </Button>

            </Form>

        </div>
    )
}

export default SearchBox