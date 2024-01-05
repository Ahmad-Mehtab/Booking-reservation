import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [roomReserved, setRoomReserved] = useState([]);
  const [reservedDates, setReservedDates] = useState(false);

  const { dates } = useContext(SearchContext);

  const navigate = useNavigate();
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setRoomReserved(
      checked
        ? [...roomReserved, value]
        : roomReserved.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dates = [];
    while (start <= end) {
      dates.push(start.getTime());
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const checkAvailableDates = (room) => {
    const allUnavailableDates = room.unavailableDates.some((unavailableDates) =>
      allDates.includes(new Date(unavailableDates).getTime())
    );

    return !allUnavailableDates;
  };

  const handleSubmit = async () => {
    try {
      Promise.all(
        roomReserved.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.name}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">
                Price:<b>{item.price}</b>
              </div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((room, i) => (
                <div className="room" key={i}>
                  <label>Room No:{room.number}</label>
                  <input
                    type="checkbox"
                    value={room._id}
                    onChange={handleSelect}
                    disabled={!checkAvailableDates(room)}
                  />
                  <span
                    style={{
                      color: !checkAvailableDates(room) ? "red" : "#0071c2",
                    }}
                  >
                    {!checkAvailableDates(room) ? "Reserved" : "Not reserved"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton" onClick={handleSubmit}>
          Reserve Now!
        </button>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Reserve;
