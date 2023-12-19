import { useEffect } from "react";
import Navbar from "./Navbar";
import Web3ReactManager from "../Web3ReactManager";
// import Footer from './footer'

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
