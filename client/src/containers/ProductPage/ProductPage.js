import React, {Component} from 'react';
import {deleteProduct, fetchProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";

class ProductPage extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  deleteProductButton = () => {
    if (this.props.user && this.props.user._id === this.props.product.user._id) {
      return <Button type="button" onClick={() => this.props.deleteProduct(this.props.product._id)}>Delete</Button>
    }
  };

  render() {
    const {product} = this.props;
    return (
      <div>
        {product && (
          <div>
            <ProductThumbnail image={product.image}/>
            <div><strong>Title: </strong>{product.title}</div>
            <div><strong>Description: </strong>{product.description}</div>
            <div><strong>Price: </strong>{product.price} KGS</div>
            <div><strong>Category: </strong>{product.category.title}</div>
            <div><strong>Seller: </strong>{product.user.displayName} - {product.user.phone}</div>
            { this.deleteProductButton() }
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  deleteProduct: productId => dispatch(deleteProduct(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);