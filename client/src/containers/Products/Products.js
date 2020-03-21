import React, {Component, Fragment} from 'react';
import {Button} from "reactstrap";
import {fetchProducts} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ProductListItem from "../../components/ProductListItem/ProductListItem";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  };

  getCategoryTitle() {
    return this.props.categories.filter(category => category._id === this.props.category)[0].title;
  };

  render() {
    return (
      <>
        <h3>{ this.props.category ? this.getCategoryTitle() : 'All items'}</h3>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {this.props.products.map(product => (
              <ProductListItem
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
              />
          ))}
        </div>

        <div ref={this.bottom}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  category: state.products.category,
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
