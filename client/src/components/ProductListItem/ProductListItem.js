import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody} from "reactstrap";
import ProductThumbnail from "../ProductThumbnail/ProductThumbnail";
import {Link} from "react-router-dom";

const ProductListItem = props => {
    return (
        <Card style={{width: '200px', marginBottom: '20px', marginRight: '20px'}}>
            <CardBody>
                <ProductThumbnail image={props.image}/>
                <Link to={'/product/' + props._id}>
                    {props.title}
                </Link>
                <strong style={{marginLeft: '10px'}}>
                    {props.price} KGS
                </strong>
            </CardBody>
        </Card>
    );
};

ProductListItem.propTypes = {
    image: PropTypes.string,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default ProductListItem;