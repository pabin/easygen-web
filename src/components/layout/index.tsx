import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LayoutContainer({ children }: any) {
  // console.log('yes profile loaded');

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default LayoutContainer;
