import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductItem from "../ProductItem";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});
class Catalog extends Component {
  static propTypes = {
    products: PropTypes.array,
    addToCart: PropTypes.func
  };

  render() {
    const { products, classes, addToCart } = this.props;

    const listItems =
      products && products.length > 0 ? (
        products.map(product => (
          <Grid item xs={4} key={product.id}>
            <ProductItem product={product} addToCart={addToCart} />
          </Grid>
        ))
      ) : (
        <li>
          <i>No Products</i>
        </li>
      );
    return (
      <div className={classes.root}>
        <h1>Products</h1>
        <Grid container spacing={24}>
          {listItems}
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Catalog);
