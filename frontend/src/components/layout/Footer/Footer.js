import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "../Footer/Footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            {/* <p>Download App for Android and IOS mobile phone</p> */}
            <img src={playStore} alt="Playstore" />
            <img src={appStore} alt="Appstore" />
        </div>
        <div className="midFooter">
            <h1>ShopSmart</h1>
            <p>We provide smart services to our smart customers</p>
            <p>Copyrights {new Date().getFullYear()} &copy; AnushkaKohli</p>
        </div>
        <div className="rightFooter">
            <h4>Follow Me</h4>
            <a href="https://www.linkedin.com/in/anushka-kohli-9410771b8/">LinkedIn</a>
            <a href="https://github.com/AnushkaKohli">Github</a>
            <a href="https://twitter.com/anuskha_kohli">Twitter</a>
        </div>
    </footer>
  );
};

export default Footer;
