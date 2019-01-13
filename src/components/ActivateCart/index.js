import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import { Badge } from "@material-ui/core";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  }
});
function ActivateCart(props) {
  const { classes, setIsCartOpen, cartItems } = props;
  return (
    <div>
      <Fab
        color="secondary"
        aria-label="Edit"
        className={classes.fab}
        onClick={setIsCartOpen}
      >
        <Badge
          badgeContent={cartItems}
          color="primary"
          invisible={!(cartItems > 0)}
        >
          <Icon>shopping_cart</Icon>
        </Badge>
      </Fab>
    </div>
  );
}

ActivateCart.propTypes = {
  setIsCartOpen: PropTypes.func,
  cartItems: PropTypes.number
};

export default withStyles(styles)(ActivateCart);
