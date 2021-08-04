import { Link, useHistory } from 'react-router-dom';
import { FaRssSquare } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import { logout } from '../context/actions/authAction';

const Navbar = () => {
  const history = useHistory();
  const {
    authState: { authenticated, user },
    authDispatch,
  } = useGlobalContext();
  return (
    <nav className="py-2 navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fs-3 d-flex align-items-center">
          <FaRssSquare className="me-2" />{' '}
          <span className="fw-bold text-uppercase">TanyaJawab</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="text-center ms-auto navbar-nav">
            {authenticated ? (
              <div className="nav-item-login d-flex align-items-center">
                <li className="nav-item text-light me-3">
                  Halo, {user.fullname}
                </li>
                <button
                  className="btn btn-light"
                  onClick={() => logout(history)(authDispatch)}
                  id="btnLogout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/auth/login" className="nav-link text-light me-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/auth/register"
                    className="px-3 nav-link btn btn-light text-dark"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
