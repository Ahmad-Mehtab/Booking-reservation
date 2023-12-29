import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {


  return (
    <div>
      <Navbar />
      <Header type="list" />
  
        <div className="hotelContainer">
        
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
            
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                
              />
              <div className="sliderWrapper">
                <img
                  
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
              
              />
            </div>
        
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle"></h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span></span>
            </div>
            <span className="hotelDistance">
              Excellent location – m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              <div className="hotelImgWrapper">
                <img
                  src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
                  alt=""
                  className="hotelImg"
                />
              </div>
            
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle"></h1>
                <p className="hotelDesc"></p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a -night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                 fffff
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
    </div>
  );
};

export default Hotel;
