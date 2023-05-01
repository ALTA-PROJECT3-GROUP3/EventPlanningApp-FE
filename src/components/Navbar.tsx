import {
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarPlus,
} from "react-icons/fa";
import { FC } from "react";
import logos from "/NavLog.png";
import { Link, useNavigate, NavLink } from "react-router-dom";

const Navbar: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-[#0A142F] px-32 sticky top-0 text-gray-300 z-50">
      <div className="flex-1">
        <NavLink
          to="/"
          id="to-homepage"
          className="btn btn-ghost normal-case text-xl hover:bg-inherit"
        >
          <img src={logos} alt="logo-event-planner" />
        </NavLink>
      </div>
      <div data-theme="mytheme" className="flex-none bg-inherit">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <NavLink
              id="to-dashboard"
              to={`/u/username`}
              className=" text-slate-300 bg-inherit hover:bg-primary "
            >
              Dashboard
            </NavLink>
          </li>
          <li tabIndex={0} className="dropdown dropdown-end">
            <a className="active:bg-[#080f25] hover:bg-inherit">
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul
              tabIndex={0}
              className="dropdown-content text-gray-800 menu p-2 shadow bg-gray-100 rounded-box w-52 "
            >
              <li>
                <NavLink
                  id="to-add-event"
                  to={`/u/username/add_event`}
                  className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800"
                >
                  <FaCalendarPlus className="h-5 w-5" />
                  Add Event
                </NavLink>
              </li>
              <div className="my-2" />
              <li>
                <NavLink
                  id="to-profile"
                  to={`/u/username/profile`}
                  className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800"
                >
                  <FaUserCircle className="h-5 w-5" />
                  View Profile
                </NavLink>
              </li>
              <li>
                <a
                  id="btn-logout"
                  className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                  Log Out
                </a>
              </li>
              <li>
                <a
                  id="btn-login"
                  className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800"
                >
                  <FaSignInAlt className="h-5 w-5" />
                  Log In
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
