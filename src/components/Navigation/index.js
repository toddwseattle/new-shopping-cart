import React, { Component } from "react";

import PropTypes from "prop-types";
import * as ROUTES from "../../constants/routes";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ActivateCart from "../ActivateCart";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navigation extends Component {
  signOut = event => {
    const { firebase } = this.props;
    firebase.doSignOut();
    console.log("Signout!");
  };

  state = {
    auth: true,
    anchorEl: null,
    authMenu: {
      signin: { description: "Sign In", route: ROUTES.SIGN_IN, onClick: null },
      account: { description: "Account", route: ROUTES.ACCOUNT, onClick: null },
      admin: { description: "Admin", route: ROUTES.ADMIN, onClick: null },
      signout: {
        description: "Sign Out",
        route: ROUTES.LANDING,
        onClick: this.signOut
      }
    }
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAuthMenuClose = event => {
    const { history } = this.props;
    const { authMenu } = this.state;
    this.setState({ anchorEl: null });
    const currentItem = authMenu[event.target.id];
    if (currentItem && currentItem.onClick) {
      currentItem.onClick(event);
    }
    if (currentItem && currentItem.route) {
      history.push(currentItem.route);
    }
  };
  buildMenu(menu, onclick) {
    const nameArray = Object.keys(menu);
    return nameArray.map(menuItem => (
      <MenuItem id={menuItem} key={menuItem} onClick={onclick}>
        {menu[menuItem].description}
      </MenuItem>
    ));
  }
  render() {
    const { classes, cartItems, setIsCartOpen } = this.props;
    const { auth, anchorEl, authMenu } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              id="menu-icon"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              id="shop-shirts"
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
              <Link to={ROUTES.LANDING}>Shop Shirts</Link>
            </Typography>
            <ActivateCart
              id="cart"
              setIsCartOpen={setIsCartOpen}
              cartItems={cartItems}
            />
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleAuthMenuClose}
                >
                  {this.buildMenu(authMenu, this.handleAuthMenuClose)};
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  setIsCartOpen: PropTypes.func.isRequired,
  cartItems: PropTypes.number.isRequired
};

export default compose(
  withStyles(styles),
  withRouter,
  withFirebase
)(Navigation);
