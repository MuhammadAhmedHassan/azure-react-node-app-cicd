import React from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

interface UserPayload {
  id: string;
  email: string;
  iat: number;
}

export function Navbar() {
  function CustomLink({ children, to, ...props }: LinkProps) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    props.className = props.className + (match ? " active" : "");
    return (
      <Link to={to} {...props} aria-current={match ? "page" : "false"}>
        {children}
      </Link>
    );
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <CustomLink to='/' className='navbar-brand'>
          Navbar
        </CustomLink>
        {/* <Link to='/' className='navbar-brand'>
        </Link> */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <CustomLink to='/login' className='nav-link'>
                Login
              </CustomLink>
            </li>
            <li className='nav-item'>
              <CustomLink to='/register' className='nav-link'>
                Register
              </CustomLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
