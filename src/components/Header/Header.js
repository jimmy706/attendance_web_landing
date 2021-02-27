import React from "react";
import { Link } from "react-router-dom";
import HeaderUserInfo from "./HeaderUserInfo";

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
    name: "Contact",
    path: "/home",
  },
];

function Header(props) {
  return (
    <header className="header">
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
                style={{
                    marginRight: '15px',
                    cursor: 'pointer',
                    fontSize: '1.4rem'

                }}
                title="Create new meeting"
            >
                <ion-icon name="add-outline"></ion-icon>
            </Link>
            <HeaderUserInfo/>
        </div>
      </div>
    </header>
  );
}

export default Header;
