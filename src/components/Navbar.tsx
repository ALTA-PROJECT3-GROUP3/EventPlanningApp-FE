import {
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarPlus,
} from "react-icons/fa";
import { FC, Fragment, useContext } from "react";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useNavigate, NavLink } from "react-router-dom";

import logos from "/NavLog.png";
import { handleAuth } from "../utils/redux/reducers/reducer";
import Swal from "../utils/swal";

const Navbar: FC = () => {
  const [cookie, , removeCookie] = useCookies(["token", "uname", "name", "id"]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkToken = cookie.token;
  const getUname = cookie.uname;

  const handleLogout = async () => {
    MySwal.fire({
      title: "Logout",
      text: "Are you sure?",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("token");
        removeCookie("uname");
        removeCookie("name");
        removeCookie("id");

        dispatch(handleAuth(false));
        navigate("/");
      }
    });
  };

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
          {checkToken ? (
            <li>
              <NavLink
                id="to-dashboard"
                to={`/u/${getUname}`}
                className=" text-slate-300 bg-inherit hover:bg-primary "
              >
                Dashboard
              </NavLink>
            </li>
          ) : (
            <></>
          )}
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
              {checkToken ? (
                <>
                  <li>
                    <NavLink
                      id="to-add-event"
                      to={`/u/${getUname}/add_event`}
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
                      to={`/u/${getUname}/profile`}
                      className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800"
                    >
                      <FaUserCircle className="h-5 w-5" />
                      View Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}

              <li>
                <a
                  id="btn-logout"
                  className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800"
                  onClick={() =>
                    checkToken ? handleLogout() : navigate("/login")
                  }
                >
                  {checkToken ? (
                    <FaSignOutAlt className="h-5 mr-2 w-5" aria-hidden="true" />
                  ) : (
                    <FaSignInAlt className="h-5 mr-2 w-5" aria-hidden="true" />
                  )}
                  {checkToken ? "Logout" : "Login"}
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
