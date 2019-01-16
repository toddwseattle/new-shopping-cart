import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthentication, AuthUserContext } from "../Session";

const AccountPage = props => (
  <div>
    <h1>
      Account Page
      <AuthUserContext.Consumer>
        {authUser =>
          authUser &&
          (authUser.displayname
            ? ` for ${authUser.displayname}`
            : ` for email name ${authUser.email}`)
        }
      </AuthUserContext.Consumer>
    </h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;
