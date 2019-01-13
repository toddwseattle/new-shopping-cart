import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  chip: {
    margin: theme.spacing.unit
  }
});
function SizeChips(props) {
  const { sizes, classes } = props;

  const SizeChips = sizes.map(size => (
    <Chip key={size} label={size} color="primary" className={classes.chip} />
  ));
  return (
    <Paper className={classes.paper}>
      <Typography>Sizes: {SizeChips}</Typography>
    </Paper>
  );
}

SizeChips.propTypes = {
  sizes: PropTypes.array
};

export default withStyles(styles)(SizeChips);
