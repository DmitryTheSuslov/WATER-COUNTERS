import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delCookie } from "src/slices/cookieSlice";
import { resetCartCount } from "src/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button, Nav, Navbar, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import logo from "assets/logo.png";
import { RootState } from "src/store"; // Импортируем RootState для типизации
import "./index.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Извлекаем данные из Redux Store
  const { cookie } = useSelector((state: RootState) => state.cookie); // Состояние cookie
  const { user, isAuthenticated, name } = useSelector((state: RootState) => state.user); // Данные о пользователе
  const classroomsCount = useSelector((state: RootState) => state.addresses_count.addressesCount);

  const handleLogout = () => {
    dispatch(delCookie());
    dispatch(resetCartCount());
    navigate("/login");
  };

  return (
    <Navbar className="p-3 header-navbar" expand="lg">
      <NavLink tag={RRNavLink} to="/" className="header-brand d-flex align-items-center">
        <img src={logo} alt="МГТУ" className="header-logo" />
      </NavLink>
      <Nav className="ml-auto d-flex align-items-center">
        <NavItem className="nav-item-custom">
          <NavLink tag={RRNavLink} to="/addresses" className="nav-link-custom">
            Адреса
          </NavLink>
        </NavItem>
        {isAuthenticated || cookie ? (
          <>
            <NavItem className="nav-item-custom">
              <NavLink tag={RRNavLink} to="/my_fixations" className="nav-link-custom">
                Мои фиксации
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-custom">
              <NavLink tag={RRNavLink} to="/profile" className="nav-link-custom">
                {name || "пользователь"}
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Button color="link" onClick={handleLogout} className="nav-link-custom">
                Выйти
              </Button>
            </NavItem>
          </>
        ) : (
          <NavItem className="nav-item-custom">
            <NavLink tag={RRNavLink} to="/login" className="nav-link-custom">
              Войти
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;