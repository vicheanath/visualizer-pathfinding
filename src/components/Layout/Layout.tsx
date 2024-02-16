import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";


const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Layout;
