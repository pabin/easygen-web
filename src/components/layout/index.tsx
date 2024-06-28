import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LayoutContainer({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default LayoutContainer;
