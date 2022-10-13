
import {
    SEARCHBOX_KEYWORD_SET,
    SEARCHBOX_CATEGORY_SET,
    SEARCHBOX_BRAND_SET,

    SEARCHBOX_FILTER_SET,

} from '../constants/searchboxConstants'

export const updateKeyword = (keyword) => async (dispatch, getState) => {
    
    dispatch({
        type: SEARCHBOX_KEYWORD_SET,
        payload: {
            keyword:keyword,
        }
    })
    
}
export const updateCategory = (category) => async (dispatch, getState) => {
    
    dispatch({
        type: SEARCHBOX_CATEGORY_SET,
        payload: {
            category:category,
        }
    })
    
}
export const updateBrand = (brand) => async (dispatch, getState) => {
    
    dispatch({
        type: SEARCHBOX_BRAND_SET,
        payload: {
            brand:brand,
        }
    })
    
}
export const updateFilter = (sortBy = '', orderBy = '') => async (dispatch, getState) => {
    
    dispatch({
        type: SEARCHBOX_FILTER_SET,
        payload: {
            sortBy:sortBy,
            orderBy:orderBy,
        }
    })
    
}

