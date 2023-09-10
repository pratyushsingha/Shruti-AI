import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

import Hamburger from "hamburger-react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar1 = ({ logo }) => {
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <>
      <div className="bg-[#19459E] text-white font-sans flex justify-center items-center h-[46.4px]">
        <span>⭐ Leave Us a Review on Feedback Page! ⭐</span>
      </div>
      <div className="bg-[#0F2C41] flex justify-between text-white px-7 md:px-32 h-20">
        <div className="flex justify-start space-x-7 self-center">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 text-white rounded-full self-center"
            viewBox="0 0 24 24"
          ></img>
          <span className="text-2xl md:text-3xl self-center">Shruti AI</span>
          <NavLink to="/">
            <span className="mt-3 text-base font-semibold self-center cursor-pointer hidden md:block">
              Home
            </span>
          </NavLink>
          <NavLink to="/team">
            <span className="mt-3 text-base font-semibold self-center cursor-pointer hidden md:block">
              Team
            </span>
          </NavLink>
          <NavLink to="/about">
            <span className="mt-3 text-base font-semibold self-center cursor-pointer hidden md:block">
              About
            </span>
          </NavLink>
        </div>
        <div className="flex justify-end space-x-4 self-center">
          <div className="block md:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
          <NavLink to="/contact">
            <button className="bg-white text-[#245FFF] font-semibold px-4 py-2 rounded-3xl hover:bg-[#245FFF] hover:text-white hidden md:block">
              Contact Us
            </button>
          </NavLink>
          {!isAuthenticated ? (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-[#245FFF] text-white font-semibold px-4 py-2 rounded-3xl hover:bg-[#0736B3] hover:text-white hidden md:block"
            >
              Login
            </button>
          ) : (
            <img className="w-10 h-10 rounded-full self-center" src={user.picture} alt={user.name} />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col bg-[#0F2C41] text-white px-4 py-2">
          <ul className="text-center space-y-4">
            <NavLink to="/">
              <li className="text-base font-semibold cursor-pointer">Home</li>
            </NavLink>
            <NavLink to="/team">
              <li className="text-base font-semibold cursor-pointer">Team</li>
            </NavLink>
            <NavLink to="/about">
              <li className="text-base font-semibold cursor-pointer">About</li>
            </NavLink>
            <li>
              <NavLink to="/contact">
                <button className="bg-white text-[#245FFF] w-full font-semibold px-4 py-2 rounded-3xl hover:bg-[#245FFF] hover:text-white">
                  Contact Us
                </button>
              </NavLink>
            </li>

            <li>
              {!isAuthenticated ? (
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-[#245FFF] text-white w-full font-semibold px-4 py-2 rounded-3xl hover:bg-[#0736B3] hover:text-white"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="bg-[#245FFF] text-white w-full font-semibold px-4 py-2 rounded-3xl hover:bg-[#0736B3] hover:text-white"
                >
                  LogOut
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar1;
