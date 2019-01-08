import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Catalog extends Component {
  static propTypes = {
    products: PropTypes.array
  };

  render() {
    const listItems =
      this.props.products && this.props.products.length > 0 ? (
        this.props.products.map(item => <li key={item.id}>{item.title} </li>)
      ) : (
        <li>
          <i>No Products</i>
        </li>
      );
    return (
      <div>
        <h1>Catalog</h1>
        <ul>{listItems}</ul>
      </div>
    );
  }
}
