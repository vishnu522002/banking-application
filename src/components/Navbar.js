import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand mx-3 mx-lg-5">Zealous Bank</a>

        <form className="d-flex">
          <Link
            className="btn btn-outline-light mx-3 mx-lg-5"
            type="button"
            to={`/`}
          >
            Sign out
          </Link>
        </form>
      </div>
    </nav>
  );
}
