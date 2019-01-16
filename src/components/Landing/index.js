import React from "react";
import PropTypes from "prop-types";
import Catalog from "../../containers/Catalog";

function Landing(props) {
  const { products, addToCart } = props;
  return <Catalog products={products} addToCart={addToCart} />;
}

Landing.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default Landing;
