import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-request";

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand mx-auto">
          BLOG
        </NavLink>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <div className="navbar-nav mx-auto">
            <NavLink to="/" className="nav-item nav-link ">
              Home
            </NavLink>
          </div>
          {auth.isLoggedIn && <NavLink to="/add" className="nav-item nav-link ">
              Add Post
            </NavLink>}
          <div className="navbar-nav">
            {!auth.isLoggedIn && (
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
            )}
            {auth.isLoggedIn && (
              <div className="nav-item dropdown">
                <NavLink
                  to="/"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {auth.user.first_name + " " + auth.user.last_name}
                </NavLink>
                <div className="dropdown-menu">
                  <NavLink
                    to={`/profile/${auth.user.email}`}
                    className="dropdown-item"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={auth.onLogout}
                    className="dropdown-item hover "
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
