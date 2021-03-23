import React from "react";
import { Link } from "react-router-dom";
import VisibleToggle from "../VisibleToggle/VisibleToggle";
import { useSelector, useDispatch } from 'react-redux';
import { openBarcodeModalAction } from "../../redux/actions/barcodeModal.action";
import ReactPlaceholder from 'react-placeholder';



function HeaderUserInfo(props) {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.userState);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  }

  function getBarcode(e) {
    e.preventDefault();
    dispatch(openBarcodeModalAction())
  }

  const links = [
    {
      name: "My profile",
      path: `/user/${userState.profile?.account?.id}`,
    },
    {
      name: "Create new meeting",
      path: "/create-new",
    },
  ];

  return (
    <div className="header__user-info">
      <VisibleToggle
        toggler={
          <div className="toggle-user-menu">
            {
              userState.profile != null ? (
                <img src={`https://ui-avatars.com/api/?name=${userState.profile.full_name}&background=0D8ABC&color=fff`} />
              ) : <ReactPlaceholder type='round' style={{ width: 30, height: 30 }} />
            }
            <span>
              <ion-icon name="caret-down-outline"></ion-icon>
            </span>
          </div>
        }
      >
        <div className='header__user-info__menu'>
          <p className='signed-in-text'>
            Signed in as {userState.profile != null ? userState.profile.full_name : ''}
          </p>
          <ul>
            {links.map(link => (
              <li key={link.path}>
                <Link className='header__user-info__link' to={link.path} title={link.name}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <a onClick={getBarcode} href="#" className='header__user-info__link'>
                Get my barcode
              </a>
            </li>
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
