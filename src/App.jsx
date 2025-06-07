import Events from "./assets/pages/Events";
import Bookings from "./assets/pages/Bookings";
import ConfirmedBookings from "./assets/pages/ConfirmedBookings";
import Dashboard from "./assets/pages/Dashboard";
import EventDetails from './assets/pages/EventDetails';
import { Routes, Route, useNavigate } from "react-router-dom";
import DashboardImg from "/SquaresFour.png";
import TickBox from "/Ticket.png";
import CheckSquare from "/CheckSquare.png";
import Logo from "/Header.png";
import { useState } from "react";


// Menu buttons, that also uses useState for header text
function NavigateButton({ setHeaderText }) {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => { navigate("/"); setHeaderText("Dashboard."); }}>
        <img src={DashboardImg} alt="" /> Dashboard
      </button>
      <button onClick={() => { navigate("/events"); setHeaderText("Events"); }}>
        <img src={CheckSquare} alt="" /> Events
      </button>
      <button onClick={() => { navigate("/bookings"); setHeaderText("Bookings"); }}>
        <img src={TickBox} alt="" /> Bookings
      </button>
      {/* <button onClick={() => { navigate("/confirmedBookings"); setHeaderText("Confirmed Bookings"); }}>
        Confirmed Bookings
      </button> */}
    </>
  );
}
// All main parts of the app, routes opens pages in Body.
function App() {
  const [headerText, setHeaderText] = useState("Dashboard");

  return (
    <div className="Page">
      <div className="Menu">
        <div className="menuLogo"><img src={Logo} alt="logo" /></div>
        <NavigateButton setHeaderText={setHeaderText} />
      </div>
      <div className="NotMenu">
        <div className="Header">
          <div className="HeaderTitle">
            {headerText}

          </div>
          </div>
        <div className="Body">
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/ConfirmedBookings" element={<ConfirmedBookings />} />
            <Route path="/" element={<ConfirmedBookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;