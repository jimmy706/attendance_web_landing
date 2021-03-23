import React from "react";
import { Link } from "react-router-dom";
import HeaderUserInfo from "./HeaderUserInfo";
import { useDispatch } from 'react-redux';
import { openBarcodeModalAction } from "../../redux/actions/barcodeModal.action";
import HeaderSearch from "./HeaderSearch";
import styled from 'styled-components';
const links = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Explore new",
    path: "/home",
  },
  {
    name: "Registered",
    path: "/registered-meetings",
  },
];

const HeaderLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`

function Header(props) {
  const dispatch = useDispatch();

  function handleGetBarcode(e) {
    e.preventDefault();
    dispatch(openBarcodeModalAction());
  }

  return (
    <header className="header container1">
      <div className="header__content">
        <HeaderLeftWrapper>
          <ul className="header__link-list">
            {links.map((link, i) => (
              <li key={i}>
                <Link className="header__link" title={link.name} to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <HeaderSearch />
        </HeaderLeftWrapper>

        <div className="header__user-info-wrapper">
          <Link to="/create-new"
            title="Create new meeting"
            className='header__icon'
          >
            <ion-icon name="add-outline"></ion-icon>
          </Link>
          <a href="#"
            className='header__icon'
            title="Get my barcode"
            onClick={handleGetBarcode}
          >
            <ion-icon name="qr-code-outline"></ion-icon>
          </a>
          <HeaderUserInfo />
        </div>
      </div>
    </header>
  );
}

export default Header;
