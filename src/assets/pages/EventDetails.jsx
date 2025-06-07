import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [result, setResult] = useState("");



   // Get single event by id from event microservice
  const getEvent = async () => {
    try {
      const res = await fetch(`https://microprojectevents.azurewebsites.net/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  // load the event when id changes
  useEffect(() => {
    getEvent();
  }, [id]); 
// post event to bookings microservice (bookings are still unconfirmed, like a shopping cart)
const addBooking = async () => {
  if (!event) {
    console.error("Event data not available yet.");
    return;
  }

  try {
    const res = await fetch("https://localhost:7235/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
body: JSON.stringify({ 
  id: event.id, 
  name: event.name, 
  information: event.information 
})
    });

    if (res.ok) {
      console.log("Booking added to list, please confirm on the booking page.");
      setResult("Booking added to list, please confirm on the booking page.");

    } else {
      console.error("Failed to add booking");
      setResult("Failed to add booking");
    }
  } catch (error) {
    console.error("Error adding booking:", error);
      setResult("Error adding booking");

  }
};

  // useEffect(() => {
  // }, [result]); 

  // show event info, with a addbooking button, and show how it went
  return (
    <div>
      {/* <div>Event Details for ID: {id}</div> */}
      {event ? ( 
        <div>
          <div>Event Name: {event.name}</div>
          <div>Event Information: {event.information}</div>
          <button onClick={addBooking}>Add to Bookings</button>
          <div>{result}</div> 
        </div>


      ) : (
        <div>Loading event details...</div>
      )}
    </div>
  );
};

export default EventDetails;