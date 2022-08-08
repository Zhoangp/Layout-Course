import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {AiFillHome} from "react-icons/ai"
import {RiContactsFill} from "react-icons/ri"
import {HiOutlineLogout} from "react-icons/hi"
import {MdOutlineDataSaverOff} from "react-icons/md"
import {VscSignIn} from "react-icons/vsc"
import {FaBook} from "react-icons/fa"
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../redux/action/types";

const HomeTemplate = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {check} = useSelector(state => state.UserReducer)
  const { Component } = props;
  console.log(1)
  // on top when navigate
  const url = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [url.pathname])


  //open and close sidebar
  const ref = useRef(null);
  const [appear, setAppear] = useState(false);
  const handleMenu = () => {
    setAppear(!appear);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (appear && !ref.current.contains(event.target)) {
        setAppear(!appear)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [appear]);

  return (
    <div className="cover">
      <div
        ref={ref}
        className={`nav ${appear ? "appear" : "non-appear"} `}
      >
        <ul>
          <li>
            <Link to="/" onClick={handleMenu}>
              <AiFillHome/>
              <span className={`${url.pathname === '/' ? "active-color" : ""}`}>HOME</span>
            </Link>
          </li>
          <li>
            <Link to="/admin" onClick={handleMenu}>
              <RiContactsFill/>
              <span className={`${url.pathname === '/admin' ? "active-color" : ""}`}>ADMIN</span>
            </Link>
          </li>
          <li>
            <Link to="/courses" onClick={handleMenu}>
              <FaBook/>
              <span className={`${url.pathname === '/courses' ? "active-color" : ""}`}>COURSES</span>
            </Link>
          </li>
            {check !== 0 ?
           
          <li>

              <Link to="/signin" onClick={handleMenu}>
              <VscSignIn/>
             <span>SIGN IN</span> 
            </Link>
          </li>

            :
            <Fragment>
            <li>
            <Link to="/saved" onClick={handleMenu}>
              <MdOutlineDataSaverOff/>
              <span className={`${url.pathname === '/saved' ? "active-color" : ""}`}>SAVED</span>
            </Link>
          </li>
            <li>
            <Link to="/" onClick={() => {
               dispatch({type: actionTypes.SIGN_OUT})
               handleMenu()

            }}>
              <HiOutlineLogout/>
              <span>SIGN OUT</span>
            </Link>
            </li>
          </Fragment>

            }
            
        </ul>
      </div>
      <div className={`${appear ? "nav_effect" : "non_nav_effect"}`}>
        <Header appear={appear} openMenu={handleMenu} />
        <Component />
        <Footer />
      </div>
    </div>
  );
};

export default HomeTemplate;
