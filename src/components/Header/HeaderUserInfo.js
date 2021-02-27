import React from "react";
import { Link } from "react-router-dom";
import VisibleToggle from "../VisibleToggle/VisibleToggle";
import { useHistory } from 'react-router-dom';

const links = [
  {
    name: "My profile",
    path: "/my-profile",
  },
  {
    name: "Enrolled meetings",
    path: "/enrolled-meetings",
  },
  {
    name: "My meetings",
    path: "/my-meeting",
  },
];

function HeaderUserInfo(props) {
    const history = useHistory();
    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        history.push("/");
    }

  return (
    <div className="header__user-info">
      <VisibleToggle
        toggler={
          <div className="toggle-user-menu">
            <img src="https://ui-avatars.com/api/?name=Dung%20Dang" />
            <span>
              <ion-icon name="caret-down-outline"></ion-icon>
            </span>
          </div>
        }
      >
        <div className='header__user-info__menu'>
        <p className='signed-in-text'>
            Signed in as Dung Dang
        </p>
        <ul>
            {links.map(link => (
                <li  key={link.path}>
                    <Link className='header__user-info__link' to={link.path} title={link.name}>
                        {link.name}
                    </Link>
                </li>
            ))}
            <li>
                <a onClick={handleLogout} className='header__user-info__link' href="#">
                    Logout
                </a>
            </li>
        </ul>
        </div>
      </VisibleToggle>
    </div>
  );
}

export default HeaderUserInfo;
