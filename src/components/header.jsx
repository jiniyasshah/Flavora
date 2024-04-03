import logo from "../assets/Flavora.svg";
import Avatar from "../assets/avatar.png";

import { IoBasket, IoLogOut } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import { userActions } from "../store/userSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import { signOut } from "firebase/auth";

import { toast } from "react-toastify";

function Header() {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.user);
  const cartDetails = useSelector((store) => store.cart);

  // to authenticate
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Function to handle login
  const login = async () => {
    try {
      if (!userDetails) {
        const { user } = await signInWithPopup(firebaseAuth, provider);
        const { refreshToken, providerData } = user;
        dispatch(userActions.storeUser(providerData[0]));
        notify("Successfully Loggedin");
      } else {
        setToggleLogin(!toggleLogin);
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  // Function to handle logout
  const handleLogOut = () => {
    signOut(firebaseAuth)
      .then(() => {
        dispatch(userActions.logOutUser());
        notify("Successfully Loggedout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to display toast notifications
  const notify = (message) => {
    toast(message);
  };

  return (
    <>
      <header className="w-screen z-50 p-3 px-7 md:p-6 md:px-[3rem]">
        {/* Desktop and Tablet */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            className="flex items-center gap-2"
          >
            <Link to="/">
              <img src={logo} className="w-[12rem] object-cover" alt="" />
              <p className="text-headingColor text-xl font-bold">
                Feed your Hunger!!
              </p>
            </Link>
          </motion.div>
          <div className="flex items-center justify-between">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-8 "
            >
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to="/about">About us </Link>
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to="/menu">Menu</Link>
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Services
              </li>
              {!userDetails && (
                <li
                  onClick={login}
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Sign-in
                </li>
              )}
            </motion.ul>
            <div
              className="relative flex items-center justify-center cursor-pointer"
              onClick={() => handleSidebar()}
            >
              <IoBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
              <div className="w-5 h-5 rounded-full bg-cartNumBg flex item-center justify-center absolute -top-1 -right-2">
                <p className="text-xs text-white font-semibold leading-0">
                  {cartDetails.length}
                </p>
              </div>
            </div>

            <div className="relative">
              {userDetails && (
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  onClick={login}
                  src={userDetails.photoURL}
                  alt="User Image"
                  className="w-10 min-w-[40px] min-h-[40px] cursor-pointer rounded-3xl drop-shadow-2xl ml-8"
                />
              )}

              {toggleLogin && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
                >
                  {userDetails &&
                    userDetails.email === "jiniyasshahts@gmail.com" && (
                      <Link to="/createitems">
                        <p className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                          <IoMdAdd className="mr-2" /> New Item
                        </p>
                      </Link>
                    )}
                  {userDetails && (
                    <p
                      className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => handleLogOut()}
                    >
                      <IoLogOut className="mr-2" /> Logout
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden">
          <div className="flex md:hidden w-full h-full items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="flex items-center gap-2"
            >
              <Link to="/">
                <img src={logo} className="w-[12rem] object-cover" alt="" />
                <p className="text-headingColor text-xl font-bold">
                  Feed your Hunger!!
                </p>
              </Link>
            </motion.div>
            <div className="flex items-center justify-between">
              <div
                className="relative flex items-center justify-center"
                onClick={() => handleSidebar()}
              >
                <IoBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
                <div className="w-5 h-5 rounded-full bg-cartNumBg flex item-center justify-center absolute -top-1 -right-2">
                  <p className="text-xs text-white font-semibold leading-0">
                    {cartDetails.length}
                  </p>
                </div>
              </div>

              <div className="relative">
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  onClick={login}
                  src={userDetails ? userDetails.photoURL : Avatar}
                  alt="User Image"
                  className="w-10 min-w-[40px] min-h-[40px] cursor-pointer rounded-3xl drop-shadow-2xl ml-8"
                />
                {toggleLogin && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute z-10 top-12 right-0 overflow-hidden"
                  >
                    {userDetails &&
                      userDetails.email === "jiniyasshahts@gmail.com" && (
                        <Link to="/createitems">
                          <p className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                            <IoMdAdd className="mr-2" /> New Item
                          </p>
                        </Link>
                      )}
                    <motion.ul
                      initial={{ opacity: 0, x: 200 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 200 }}
                    >
                      <li className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/about">About us</Link>
                      </li>
                      <li className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/menu">Menu</Link>
                      </li>
                      <li className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                        Services
                      </li>
                    </motion.ul>
                    {userDetails && (
                      <p
                        className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => handleLogOut()}
                      >
                        <IoLogOut className="mr-2" /> Logout
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {toggleSidebar ? <CartContainer action={handleSidebar} /> : ""}
    </>
  );
}

export default Header;
