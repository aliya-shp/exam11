import React from 'react';

import imageNotAvailable from '../../assets/images/image_not_available.jpg';
import {serverURL} from "../../constants";

const styles = {
    width: '100px',
    height: '100px',
    marginRight: '10px'
};

const ProductThumbnail = props => {
    let image = imageNotAvailable;

    if (props.image && props.image !== "null") {
        image = serverURL + '/uploads/' + props.image;
    }

    return <img src={image} style={styles} className="img-thumbnail" alt="Product" />;
};

export default ProductThumbnail;