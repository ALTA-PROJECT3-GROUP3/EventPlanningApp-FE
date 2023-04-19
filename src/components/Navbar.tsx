import React from "react";
import logos from "/NavLog.png";

const Navbar = () => {
  return (
    <div className="navbar bg-[#0A142F] px-32 sticky top-0">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl hover:bg-inherit">
          <img src={logos} alt="logo-event-planner" />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <a className="active:bg-[#080f25] hover:bg-inherit">Dashboard</a>
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
                <a className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800">
                  View Profile
                </a>
              </li>
              <li>
                <a className="hover:bg-gray-300 active:bg-gray-400 active:text-gray-800">
                  Log Out
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
