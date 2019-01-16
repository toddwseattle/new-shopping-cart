import React, { Component } from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import ShoppingCart from "./containers/ShoppingCart";
import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";
import PasswordForgetPage from "./components/PasswordForget";
import AdminPage from "./components/Admin";
import HomePage from "./components/Home";
import AccountPage from "./components/Account";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withAuthentication } from "./components/Session";
class MyApp extends Component {
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
      cart: [],
      authUser: null
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
      <Router>
        <div>
          <Navigation
            setIsCartOpen={this.setIsCartOpen}
            cartItems={cart.length}
          />
          <hr />

          <Grid container spacing={24}>
            <Grid item xs={cartIsOpen ? 8 : 12}>
              <Route
                exact
                path={ROUTES.LANDING}
                component={props => (
                  <LandingPage products={products} addToCart={this.addToCart} />
                )}
              />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
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
              <span />
            )}
          </Grid>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(MyApp);
