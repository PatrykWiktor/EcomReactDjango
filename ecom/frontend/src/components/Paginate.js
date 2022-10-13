import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, query, isAdmin = false }) {

    let keyword = ''
    let cat = ''
    let brand = ''
    let sortBy = ''
    let orderBy = ''

    if (query) {
        query = query.split('?keyword=')[1].split('&')

        if (query[0]) {
            keyword = query[0]
        }

        query = query.slice(1)

        for (let i = 0; i < query.length; i++) {
            if
                (query[i].split('=')[0] === 'brand') {
                brand = query[i].split('=')[1]
            } else if
                (query[i].split('=')[0] === 'cat') {
                cat = query[i].split('=')[1]
            }
            else if
                (query[i].split('=')[0] === 'sortBy') {
                sortBy = query[i].split('=')[1]
            }
            else if
                (query[i].split('=')[0] === 'orderBy') {
                orderBy = query[i].split('=')[1]
            }

        }

        
    }
    

    // cat = cat.split('&')[1].split('cat=')[1]
    // console.log(cat)

    // brand = brand.split('&brand=')[1].split('&')[0]
    // console.log(brand)

    // sortBy = sortBy.split('&sortBy=')[1].split('&')[0]
    // console.log(sortBy)

    // orderBy = orderBy.split('&orderBy=')[1]
    // console.log(orderBy)

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={!isAdmin ?
                        `/?keyword=${keyword && keyword}&page=${x + 1}${cat && '&cat=' + cat}${brand && '&brand=' + brand}${sortBy && '&sortBy=' + sortBy}${orderBy && '&orderBy=' + orderBy}`
                        : `/admin/productlist/?keyword=${keyword && keyword}&page=${x + 1}${cat && '&cat=' + cat}${brand && '&brand=' + brand}${sortBy && '&sortBy=' + sortBy}${orderBy && '&orderBy=' + orderBy}`
                    }
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
