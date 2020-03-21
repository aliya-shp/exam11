import {
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_SUCCESS
} from "../actions/productsActions";

const initialState = {
    products: [],
    category: null,
    product: null,
    error: null,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, products: action.products, category: action.category};
        case FETCH_PRODUCT_SUCCESS:
            return {...state, product: action.product};
        case CREATE_PRODUCT_SUCCESS:
            return {...state, error: null};
        case CREATE_PRODUCT_FAILURE:
            return {...state, error: action.error};
        case DELETE_PRODUCT_SUCCESS:
            return {...state, error: null};
        case DELETE_PRODUCT_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default productsReducer;