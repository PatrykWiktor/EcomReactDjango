import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function ProductFeatured({ product }) {
    return (
        
        <Card className="my-3 rounded text-center card-trans">

            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Title as='h4' className='my-3'>
                <Link to={`/product/${product._id}`}>
                    <strong>{product.name}</strong>
                </Link>
            </Card.Title>

            <Card.Text as='h4'  >
                ${product.price}
            </Card.Text>

            <div className='my-3'>
                
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                
            </div>



        </Card>

    )
}

export default ProductFeatured
