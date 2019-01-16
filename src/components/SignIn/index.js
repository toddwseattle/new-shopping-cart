import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { SignUpLink } from "../SignUp";
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const styles = theme => ({
  divmain: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

function SignIn(props) {
  return (
    <div>
      {" "}
      <SignInForm /> <SignUpLink />
    </div>
  );
}

SignIn.propTypes = {};

class SignInFormBase extends Component {
  static propTypes = {
    prop: PropTypes
  };
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";
    return (
      <div className={classes.divmain}>
        <Paper className={classes.paper}>
          <h1>Sign In</h1>
          <form onSubmit={this.onSubmit} className={classes.form}>
            <TextField
              margin="dense"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              fullWidth
            />
            <TextField
              margin="dense"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              fullWidth
            />
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </Paper>
      </div>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(SignInFormBase);

export default SignIn;
