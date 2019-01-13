import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  }
});
function CloseCart(props) {
  const { classes, setIsCartOpen } = props;
  return (
    <div>
      <Fab
        color="secondary"
        aria-label="Edit"
        className={classes.fab}
        onClick={setIsCartOpen}
      >
        <Icon>close</Icon>
      </Fab>
    </div>
  );
}

CloseCart.propTypes = {
  setIsCartOpen: PropTypes.func
};

export default withStyles(styles)(CloseCart);
