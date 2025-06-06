import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="eventCard">
      <div className="eventCardTop">
        <div className="eventCardTopType">Type</div>
      </div>
      
      <div className="eventCardBottom">
        <button className="cardButton"  onClick={() => navigate(`/events/${event.id}`)}>
          
          <div className="cardTitle">{event.name}</div>
          <div>{event.information}</div>

        </button>
      </div>
      
    </div>
  );
};

export default EventCard;