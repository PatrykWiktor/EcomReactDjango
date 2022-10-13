import {
    SEARCHBOX_KEYWORD_SET,
    SEARCHBOX_KEYWORD_RESET,
    SEARCHBOX_CATEGORY_SET,
    SEARCHBOX_CATEGORY_RESET,
    SEARCHBOX_BRAND_SET,
    SEARCHBOX_BRAND_RESET,

    SEARCHBOX_FILTER_SET,
    SEARCHBOX_FILTER_RESET,



} from '../constants/searchboxConstants'

export const keywordReducer = (state = { keyword: '' }, action) => {
    switch (action.type) {
        case SEARCHBOX_KEYWORD_SET:
            return {
                keyword: action.payload
            }
        case SEARCHBOX_KEYWORD_RESET:
            return {
                keyword: ''
            }

        default:
            return state

    }
}

export const categoryReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case SEARCHBOX_CATEGORY_SET:
            return {
                category: action.payload
            }
        case SEARCHBOX_CATEGORY_RESET:
            return {
                category: []
            }

        default:
            return state

    }
}

export const brandReducer = (state = { brand: [] }, action) => {
    switch (action.type) {
        case SEARCHBOX_BRAND_SET:
            return {
                brand: action.payload
            }
        case SEARCHBOX_BRAND_RESET:
            return {
                brand: []
            }

        default:
            return state

    }
}

export const filterReducer = (state = { sortBy: '', orderBy: '' }, action) => {
    switch (action.type) {
        case SEARCHBOX_FILTER_SET:
            return {
                sortBy: action.payload.sortBy,
                orderBy: action.payload.orderBy
            }
        case SEARCHBOX_FILTER_RESET:
            return {
                sortBy: '',
                orderBy: ''
            }
        default:
            return state

    }
}

