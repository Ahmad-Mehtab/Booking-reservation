import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import gif from "../../assets/images/VAyR.gif";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  return (
    <div className="fp">
      <>
        {loading || error ? (
          <img src={gif} className="w-36 mx-auto mt-5" alt="" />
        ) : (
          data &&
          data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={
                  item.photos[0] ??
                  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
                }
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))
        )}
      </>
    </div>
  );
};

export default FeaturedProperties;
