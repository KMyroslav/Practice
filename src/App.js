import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import routes from "./Routes";

function App() {
  return (
    <div className="container">
      <div
        className="nav nav-open"
        onMouseEnter={(e) => {
          e.currentTarget.classList = "nav nav-open";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.classList = "nav";
        }}
      >
        {routes.map((el, i) => (
          <NavLink key={`link-${i}`} className="link" to={Object.keys(el)[0]}>
            {Object.keys(el)[0]
              .split(/(?=[A-Z])/)
              .join(" ")}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
