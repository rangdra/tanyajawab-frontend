import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { RiAlertFill } from 'react-icons/ri';

import { login } from '../context/actions/authAction';
import { useGlobalContext } from '../context/GlobalContext';

const Login = () => {
  const history = useHistory();
  const {
    authDispatch,
    authState: { authenticated, error },
  } = useGlobalContext();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
    authDispatch({ type: 'ERROR', payload: null });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      login(user, history)(authDispatch);
    } catch (error) {
      console.log(error.response);
    }
  };

  if (authenticated) {
    history.push('/');
  }

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Link
          to="/"
          className="top-0 end-0 me-3 fs-6 d-flex align-items-center position-absolute"
          style={{ zIndex: 99 }}
        >
          <span className="me-1">Go Home</span> <FaArrowRight />
        </Link>
        <svg
          height="100%"
          width="100%"
          id="svg"
          viewBox="0 0 1440 700"
          xmlns="http://www.w3.org/2000/svg"
          className="bottom-0 transition duration-300 ease-in-out delay-150 position-absolute"
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="5%" stopColor="#0693e3ff"></stop>
              <stop offset="95%" stopColor="#9900efff"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 C 0,700 0,350 0,350 C 169.46666666666664,396 338.9333333333333,442 513,415 C 687.0666666666667,388 865.7333333333333,288 1021,265 C 1176.2666666666667,242 1308.1333333333332,296 1440,350 C 1440,350 1440,700 1440,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            className="bottom-0 transition duration-300 ease-in-out delay-150 position-absolute"
          ></path>
        </svg>
        <div
          className="p-4 mx-3 bg-white shadow w-100 login-form"
          style={{ zIndex: 99 }}
        >
          <h1 className="mb-3 text-center fw-bold fs-2 text-uppercase">
            Login
          </h1>
          {error?.error && (
            <div
              class="alert mb-3 alert-danger d-flex align-items-center"
              role="alert"
            >
              <RiAlertFill style={{ fontSize: 18, marginRight: 4 }} />
              <div>{error.error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username or Email
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                id="username"
                name="username"
                value={user.username}
                placeholder="Your Username or Email"
                required
              />
              {error?.username && (
                <p className="text-danger fst-italic" style={{ fontSize: 13 }}>
                  {error?.username}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                name="password"
                className="form-control"
                value={user.password}
                id="password"
                placeholder="Your Password"
                onChange={handleChange}
                required
              />
              {error?.password && (
                <p className="text-danger fst-italic" style={{ fontSize: 13 }}>
                  {error?.password}
                </p>
              )}
            </div>
            <div className="mb-2 form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPassword"
                onChange={(e) => setShowPassword(!showPassword)}
              />
              <label
                className="form-check-label"
                htmlFor="showPassword"
                style={{ fontSize: 14 }}
              >
                Show Password
              </label>
            </div>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Dont&apos;t have an account?{' '}
              <Link to="/auth/register" className="text-primary">
                Register
              </Link>
            </p>
            <button className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
