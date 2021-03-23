import React from "react";
import { Link } from "react-router-dom";
import HeaderUserInfo from "./HeaderUserInfo";
import { useDispatch } from 'react-redux';
import { openBarcodeModalAction } from "../../redux/actions/barcodeModal.action";
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

function Header(props) {
  const dispatch = useDispatch();

  function handleGetBarcode(e) {
    e.preventDefault();
    dispatch(openBarcodeModalAction());
  }

  return (
    <header className="header container1">
      <div className="header__content">
        <div>
          <ul className="header__link-list">
            {links.map((link, i) => (
              <li key={i}>
                <Link className="header__link" title={link.name} to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
