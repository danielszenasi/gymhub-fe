import React from "react";
import Header from "./Header";
import Footer from "../components/Footer";
import Container from "@material-ui/core/Container";

const PageContent = ({ children }) => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="Blog" />
        <main>{children}</main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
};

export default PageContent;
