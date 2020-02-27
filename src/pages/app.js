import React from "react";
import { Router } from "@reach/router";
import { Register } from "../components/Register";
import { ConfirmEmail } from "../components/ConfirmEmail";
import SignIn from "../components/SignIn";

import { History } from "../components/History";

const App = () => {
  return (
    <Router>
      <History path="/app/history/*" />
      <SignIn path="/app/login" />
      <Register path="/app/register/:email/:token" />
      <ConfirmEmail path="/app/confirm-email/:email/:token"></ConfirmEmail>
    </Router>
  );
};
export default App;
