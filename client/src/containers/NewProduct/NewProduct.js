import React, {Component, Fragment} from 'react';
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";

class NewProduct extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  createProduct = async (productData) => {
    await this.props.createProduct(productData);
  };

  render() {
    return (
      <Fragment>
        <h2>New product</h2>
        <ProductForm
          onSubmit={this.createProduct}
          categories={this.props.categories}
          error={this.props.error}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  error: state.products.error,
});

const mapDispatchToProps = dispatch => ({
  createProduct: productData => dispatch(createProduct(productData)),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);