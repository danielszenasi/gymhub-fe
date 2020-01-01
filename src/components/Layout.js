import React from "react";
import Header from "./Header";
import Footer from "../components/Footer";
import Container from "@material-ui/core/Container";

const Layout = ({ children }) => {
  return (
    <div>
      <Container maxWidth="lg">
        <Header title="Blog" />
      </Container>
      <main>{children}</main>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </div>
  );
};

export default Layout;
