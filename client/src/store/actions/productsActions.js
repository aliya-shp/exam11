import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";
import {NotificationManager} from 'react-notifications';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const fetchProductsSuccess = (products) => ({type: FETCH_PRODUCTS_SUCCESS, products});

export const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, product});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductFailure = error => ({type: CREATE_PRODUCT_SUCCESS, error});
export const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
export const deleteProductFailure = (error) => ({type: DELETE_PRODUCT_FAILURE, error});

export const fetchProducts = () => {
    return async (dispatch) => {
        const response = await axiosApi.get('/products');
        dispatch(fetchProductsSuccess(response.data));
    };
};

export const createProduct = productData => {
    return async (dispatch, getState) => {
        try {
            const user = getState().users.user;
            await axiosApi.post('/products', productData, {headers: {'Authorization': 'Token ' + user.token}});
            dispatch(createProductSuccess());
            dispatch(push('/products'));
            NotificationManager.success('Successfully created');
        } catch (error) {
            dispatch(createProductFailure(error));
            NotificationManager.error('Product was not created');
        }
    };
};

export const fetchProduct = productId => {
    return async dispatch => {
        const response = await axiosApi.get('/products/' + productId);
        dispatch(fetchProductSuccess(response.data));
    }
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.user.token;
            await axiosApi.delete('/products/' + productId, {headers: {Authorization: 'Token ' + token}});
            dispatch(deleteProductSuccess());
            dispatch(push('/products'));
            NotificationManager.warning('Successfully deleted');
        } catch (error) {
            dispatch(deleteProductFailure(error));
        }
    }
};