import React from "react";
import { Router } from "@reach/router";
import { Register } from "../components/Register";
import SignIn from "../components/SignIn";

import { History } from "../components/History";

const App = () => {
  return (
    <Router>
      <History path="/app/history/*" />
      <SignIn path="/app/login" />
      <Register path="/app/register/:email/:token" />
    </Router>
  );
};
export default App;
