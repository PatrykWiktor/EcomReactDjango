import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import Categories from './Categories';
import {
  SEARCHBOX_KEYWORD_RESET,
  SEARCHBOX_CATEGORY_RESET,
  SEARCHBOX_BRAND_RESET,
} from '../constants/searchboxConstants';
import { logout } from '../actions/userActions';

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const refreshState = () => {
    dispatch({ type: SEARCHBOX_KEYWORD_RESET });
    dispatch({ type: SEARCHBOX_CATEGORY_RESET });
    dispatch({ type: SEARCHBOX_BRAND_RESET });
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer onClick={refreshState} to="/">
            <Navbar.Brand>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 198.71 101.08"
                className="logo-svg"
              >
                <g id="Warstwa_2" data-name="Warstwa 2">
                  <g id="Warstwa_1-2" data-name="Warstwa 1">
                    <path
                      class="cls-1"
                      d="M29.67,11.23H1a1,1,0,0,1-1-1v-9a1,1,0,0,1,1-1H73.7a1,1,0,0,1,1,1v9a1,1,0,0,1-1,1H44.91a1,1,0,0,0-1,1v87.79a1,1,0,0,1-1,1H31.73a1,1,0,0,1-1-1V12.26A1,1,0,0,0,29.67,11.23Z"
                    />
                    <path
                      class="cls-1"
                      d="M90.39,55.82V59a3,3,0,0,1-3,3H58.89a3,3,0,0,1-3-3V55.82a3,3,0,0,1,3-3H87.44A3,3,0,0,1,90.39,55.82Z"
                    />
                    <path
                      class="cls-2"
                      d="M105.45,18V83.19a1.8,1.8,0,0,1-1.8,1.8H98.37a1.8,1.8,0,0,1-1.8-1.8V18a1.8,1.8,0,0,1,1.8-1.79h5.28A1.8,1.8,0,0,1,105.45,18Z"
                    />
                    <path
                      class="cls-2"
                      d="M117.14,2.06A183.89,183.89,0,0,1,144.43,0C162.86,0,176,4.28,184.69,12.39c8.85,8.11,14,19.62,14,35.69,0,16.23-5,29.5-14.31,38.65S159.77,101,140.45,101a209,209,0,0,1-23.31-1.18ZM130,90a81.07,81.07,0,0,0,13,.74c27.44,0,42.33-15.34,42.33-42.18.15-23.46-13.12-38.35-40.26-38.35A73.65,73.65,0,0,0,130,11.5Z"
                    />
                  </g>
                </g>
              </svg>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <SearchBox />

          <Navbar.Collapse className="no-grow">
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title="My Profile" id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fa fa-user" aria-hidden="true"></i>{' '}
                      Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {' '}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist/">
                    <NavDropdown.Item>
                      <i className="fa fa-users" aria-hidden="true"></i> Users
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist/">
                    <NavDropdown.Item>
                      <i className="fa fa-list" aria-hidden="true"></i> Products
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist/">
                    <NavDropdown.Item>
                      <i className="fa fa-book" aria-hidden="true"></i> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Categories />
    </header>
  );
}

export default Header;
