import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }
    updateAuthUser = authUser => {
      this.setState({ authUser: authUser });
      this.userlistner = this.props.firebase
        .user(authUser.uid)
        .onSnapshot(doc => {
          const newAuthUser = { ...authUser, ...doc.data() };
          this.setState({ authUser: newAuthUser });
        });
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.updateAuthUser(authUser)
          : this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener();
      this.userlistner();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
