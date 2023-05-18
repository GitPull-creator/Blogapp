import { Outlet } from "react-router-dom";

import AppHeader from "../AppHeader";

import "../App/App.scss";

function Layout() {
  return (
    <>
      <AppHeader />
      <main className="app__content">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
