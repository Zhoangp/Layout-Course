import React from "react";
import { GiRoundStar } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import poster from "../../img/photo-3.jpg";

const Card = (props) => { 
  const navigate = useNavigate();
  const x = 0;
  const handleSubmit = () => {
    if(x === 1) {
    navigate('/signin')

    }
  }
    const id = 123
  return (
    <div className="card" onClick={handleSubmit}>
      <NavLink  to={`/course/${id}`}>
        <div className="card__cover">
          <div className="card__top">
            <div className="card__img">
              <img src={poster} alt="image-of-course" />
            </div>
          </div>
          <div className="card__bottom">
            <div className="card__title">
              <h2>E-COMMERCE</h2>
            </div>
            <div className="card__evalute">
              Review (<span>4.5</span>) <GiRoundStar /> 
            </div>
            <div className="card__content">Economic | Graphic Design at...</div> 
          </div>
        </div>
      </NavLink>
      <div onClick={() => {
              console.log("ok")
            }} className="card__price">+ Favourite</div>
    </div>
  );
};

export default Card;
