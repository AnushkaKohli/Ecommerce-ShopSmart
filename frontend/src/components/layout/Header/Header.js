import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import { FaSearch, FaShoppingCart, FaUserAlt, } from 'react-icons/fa';
import logo from "../../../images/logo.png";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  // nav1alignItems: "center",
  // nav2alignItems: "center",
  // nav3alignItems: "center",
  // nav4alignItems: "center",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIcon : true,
  profileIconMargin: "1.5vmax",
  ProfileIconElement: FaUserAlt,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIcon: true,
  SearchIconElement: FaSearch,
  searchIconMargin: "1.5vmax",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#eb4034",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1.5vmax",
  cartIcon: true,
  CartIconElement: FaShoppingCart,  
};

const Header = () => {
  return (
    <ReactNavbar {...options} />
  );
}

export default Header;