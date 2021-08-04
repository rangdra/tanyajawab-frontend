import { useState } from 'react';
import { RiAlertFill } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { register } from '../context/actions/authAction';
import { useGlobalContext } from '../context/GlobalContext';

const Register = () => {
  const history = useHistory();
  const {
    authDispatch,
    authState: { authenticated, error },
  } = useGlobalContext();
  const [newUser, setNewUser] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewUser({ ...newUser, [name]: value });
    authDispatch({ type: 'ERROR', payload: null });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      register(newUser, history)(authDispatch);
    } catch (error) {}
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
          style={{ zIndex: 120 }}
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
            className="transition-all duration-300 ease-in-out delay-150"
          ></path>
        </svg>
        <div
          className="p-4 mx-3 bg-white shadow w-100 register-form"
          style={{ zIndex: 99 }}
        >
          <h1 className="mb-3 text-center fw-bold fs-2 text-uppercase">
            Register
          </h1>
          {error?.error && (
            <div
              class="alert mb-3 alert-danger d-flex align-items-center"
              role="alert"
            >
              <RiAlertFill style={{ fontSize: 18, marginRight: 4 }} />
              <div>{error?.error}</div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Fullname
              </label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Your Fullname"
                name="fullname"
                value={newUser.fullname}
                onChange={handleChange}
                required
              />
              {error?.fullname && (
                <p className="text-danger fst-italic" style={{ fontSize: 13 }}>
                  {error?.fullname}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Your Username"
                name="username"
                value={newUser.username}
                onChange={handleChange}
                required
              />
              {error?.username && (
                <p className="text-danger fst-italic" style={{ fontSize: 13 }}>
                  {error?.username}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                required
              />
              {error?.email && (
                <p className="text-danger fst-italic" style={{ fontSize: 13 }}>
                  {error.email}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                className="form-control"
                id="password"
                placeholder="Your Password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                required
              />
              {error?.password && (
                <p className="text-danger fst-italic" style={{ fontSize: 13 }}>
                  {error.password}
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
              Alread have an account?{' '}
              <Link to="/auth/login" className="text-primary">
                Login
              </Link>
            </p>

            <button className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
