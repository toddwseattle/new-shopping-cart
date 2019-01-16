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
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    const { history } = this.props;
    this.setState({ anchorEl: null });
    switch (event.target.id) {
      case "signin":
        history.push(ROUTES.SIGN_IN);
        break;
      case "account":
        history.push(ROUTES.ACCOUNT);
        break;
      case "admin":
        history.push(ROUTES.ADMIN);
      default:
        break;
    }
  };

  render() {
    const { classes, cartItems, setIsCartOpen } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to={ROUTES.LANDING}>Shop Shirts</Link>
            </Typography>
            <ActivateCart setIsCartOpen={setIsCartOpen} cartItems={cartItems} />
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
                  onClose={this.handleClose}
                >
                  <MenuItem id="signin" onClick={this.handleClose}>
                    Sign in
                  </MenuItem>
                  <MenuItem id="account" onClick={this.handleClose}>
                    My account
                  </MenuItem>
                  <MenuItem id="admin" onClick={this.handleClose}>
                    Admin
                  </MenuItem>
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
  withRouter
)(Navigation);
