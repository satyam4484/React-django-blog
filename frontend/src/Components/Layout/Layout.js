import Header from "./Navbar";
import Footer from "./Footer";
import { Fragment } from "react";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
