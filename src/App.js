import React, { Component } from "react";
import "./App.css";
import Catalog from "./containers/Catalog";
import { Grid } from "@material-ui/core";
import ActivateCart from "./components/ActivateCart";
import ShoppingCart from "./containers/ShoppingCart";

class App extends Component {
  constructor(props) {
    super(props);
    import("./static/data/products.json").then(json => {
      this.setState(state => {
        return { ...state, products: json.products };
      });
    });
    this.state = {
      products: [],
      cartIsOpen: false,
      cart: []
    };
  }
  setIsCartOpen = () => {
    this.setState({ cartIsOpen: !this.state.cartIsOpen });
  };
  updateCart = cart => {
    this.setState({ cart: cart });
  };
  updateCartItem = (cartItem, quantity) => {
    return {
      product: cartItem.product,
      quantity: quantity,
      cost: quantity * cartItem.product.price
    };
  };
  updateitemQuantity = (cart, cartPos) => {
    return cart.map((cartItem, index) =>
      index === cartPos
        ? this.updateCartItem(cartItem, cartItem.quantity + 1)
        : cartItem
    );
  };
  addToCart = product => {
    const { cart } = this.state;
    const cartPos = cart.findIndex(
      cartproduct => cartproduct.product.id === product.id
    );
    const newCart =
      cartPos >= 0
        ? this.updateitemQuantity(cart, cartPos)
        : cart.concat({ product: product, quantity: 1, cost: product.price });
    this.setState({ cart: newCart });
  };
  render() {
    const { cartIsOpen, products, cart } = this.state;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={cartIsOpen ? 8 : 11}>
            <Catalog products={products} addToCart={this.addToCart} />
          </Grid>
          {cartIsOpen ? (
            <Grid item xs={4}>
              <ShoppingCart
                setIsCartOpen={this.setIsCartOpen}
                cart={cart}
                updateCart={this.updateCart}
              />
            </Grid>
          ) : (
            <Grid item xs={1}>
              <ActivateCart
                setIsCartOpen={this.setIsCartOpen}
                cartItems={cart.length}
              />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default App;
