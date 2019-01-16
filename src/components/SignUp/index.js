import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import TextField from "@material-ui/core/TextField";
import { compose } from "recompose";
import { Paper, Button } from "@material-ui/core";
const SignUpLink = () => (
  <p>
    Don't have an account <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

function SignUpPage(props) {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
const INITIAL_STATE = {
  username: "",
  email: "",
  paswordOne: "",
  paswordTwo: "",
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

class SignUpFormBase extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
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
  render = () => {
    const { classes } = this.props;
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <div className={classes.divmain}>
        <Paper className={classes.paper}>
          <h1>Sign Up</h1>
          <form onSubmit={this.onSubmit} className={classes.form}>
            <TextField
              margin="dense"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
              fullWidth
            />
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
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              fullWidth
            />
            <TextField
              margin="dense"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
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
  };
}
const SignUpForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };
