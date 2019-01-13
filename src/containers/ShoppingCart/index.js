import React, { Component } from "react";
import PropTypes from "prop-types";
import CloseCart from "../../components/CloseCart";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 200
  }
});

class ShoppingCart extends Component {
  static propTypes = {
    setIsCartOpen: PropTypes.func,
    cart: PropTypes.array,
    updateCart: PropTypes.func,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { cart, classes } = this.props;
    const cartList = cart.map((cartItem, index) => (
      <TableRow key={cartItem.id}>
        <TableCell component="th" scope="row">
          {cartItem.product.title}
        </TableCell>
        <TableCell align="right">{cartItem.quantity}</TableCell>
        <TableCell align="right">
          {cartItem.product.currencyFormat}
          {cartItem.product.price.toFixed(2)}
        </TableCell>
        <TableCell align="right">{cartItem.cost.toFixed(2)}</TableCell>
      </TableRow>
    ));
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{cartList}</TableBody>
          </Table>
        </Paper>
        <CloseCart setIsCartOpen={this.props.setIsCartOpen} />
      </div>
    );
  }
}
export default withStyles(styles)(ShoppingCart);
