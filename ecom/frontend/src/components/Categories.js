import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { listProducts } from '../actions/productActions'
import { updateCategory, updateBrand } from '../actions/searchboxActions'
import { SEARCHBOX_BRAND_RESET } from '../constants/searchboxConstants'
import Message from './Message'
function Categories() {
    const dispatch = useDispatch()
    const history = useHistory()

    const productList = useSelector(state => state.productList)
    const { catAndBrand, error } = productList

    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')

    if (!catAndBrand) {
        dispatch(listProducts())
    }

    const showCat = (e) => {
        e.preventDefault()
        const target = e.target.children[0]
        if (target !== undefined) {
            target.classList.remove('isHidden')
            setCategory(e.target.getAttribute('data-selectedcat'))
            computeWidth(e)
        }
    }
    const hideCat = (e) => {
        if (e.target !== undefined) {
            const target = e.target.closest('.Cat-Dropdown')
            target.classList.add('isHidden')
            setCategory('')
        }
    }
    const computeWidth = (e) => {
        if (e.target.classList.contains('Cat')) {
            const parent = e.target
            const child = parent.children[0].children[1].children[0]
            child.style.left = -child.offsetWidth / 2 + parent.offsetWidth / 2 + 'px'
        }
    }

    const filerByCat = (e) => {
        dispatch({ type: SEARCHBOX_BRAND_RESET })
        dispatch(updateCategory(category))

        push()

        setCategory('')
        setBrand('')
    }
    const filerByBrand = (e) => {
        dispatch(updateBrand(brand))
        dispatch(updateCategory(category))

        push()
        setCategory('')
        setBrand('')
    }
    const push = () => {
        if (category !== '' && brand === '') {

            history.push(`/?keyword=&cat=${category}`)  
        }else if (category !== '' && brand !== ''){

            history.push(`/?keyword=&cat=${category}&brand=${brand}`)  
        }
    }
    return (
        <div>
            {!catAndBrand ? ''
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div className='Categories'>
                        {Object.entries(catAndBrand).map(item => (

                            <div onMouseEnter={showCat} data-selectedcat={item[0]} key={item[0]} className='Cat'>
                                {item[0]}
                                <div onMouseLeave={hideCat} className='Cat-Dropdown isHidden'>
                                    <p onClick={filerByCat} data-selectedcat={item[0]} className='Cat-Dropdown-Item-Title'>{item[0]}</p>
                                    <div>
                                        <div className='Cat-Dropdown-Field'>
                                            {item[1].map(brand => (
                                                <div key={brand}>
                                                    <p onMouseEnter={(e) => setBrand(e.target.getAttribute('data-selectedbrand'))} onMouseLeave={(e) => setBrand('')} onClick={filerByBrand} data-selectedbrand={brand} data-selectedcat={item[0]} className='Cat-Dropdown-Item'>{brand}</p>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

            }


        </div>
    )
}

export default Categories
