import React from "react";
import PropTypes from "prop-types";

function ItemPrice(props) {
  const { product } = props;
  return (
    <div>
      {product.currencyFormat}
      {product.price.toFixed(2)}
    </div>
  );
}

ItemPrice.propTypes = {
  product: PropTypes.object
};

export default ItemPrice;
