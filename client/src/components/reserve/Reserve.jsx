import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [roomReserved, setRoomReserved] = useState([]);

  const { dates } = useContext(SearchContext);


   
  const navigate = useNavigate();
const handleSelect = (e) => {
 const checked = e.target.checked;
 const value = e.target.value;
 setRoomReserved(checked ? [...roomReserved, value] : roomReserved.filter(item => item !== value))

}

const getDatesInRange = (startDate, endDate) => {
const start = new Date(startDate);
const end = new Date(endDate)



const dates = [];

while (start <= end) {
dates.push(start.getTime());
start.setDate(start.getDate() + 1)
}
 
return dates;

}


const allDates =  getDatesInRange(dates[0].startDate, dates[0].endDate)
console.log('allDates: ', allDates);
// const handleSubmit = async() => {
//   roomReserved.map((value)=>(
//     await axios.
//   ))
// }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
          {
            data.map((item)=>(
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.name}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Price:<b>{item.price}</b></div>
            </div>
            <div className="rSelectRooms">
            {item.roomNumbers.map((room, i)=>(
                <div className="room" key={i}>
                  <label>Room No:{room.number}</label>
                  <input
                    type="checkbox"
                    value={room._id}
                    onChange={handleSelect}
                    // disabled={!availbale(room)}
                  />
                </div>
             ))}
            </div>
          </div>
       ))}
        <button className="rButton" >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
