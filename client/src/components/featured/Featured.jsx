import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gif from "../../assets/images/VAyR.gif";

const Featured = () => {
  const { data, error, loading } = useFetch(
    "/hotels/countByCity?cities=peshawar,Kohat"
  );

  if (error) {
    toast.error(error)
  }
  
  useEffect(() => {
    if (data[0] === 0 && data[1] === 0) {
      toast.info("Properties in Islambad,lahore and karachi not found");
    }
    
  }, [data]);
  return (
    <div className="featured">
      {loading ? (
        <img src={gif} className="w-36 mx-auto mt-5" alt="" />
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Islambad</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>karachi</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Lahore</h1>
              <h2>{data[3]} properties</h2>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Featured;
