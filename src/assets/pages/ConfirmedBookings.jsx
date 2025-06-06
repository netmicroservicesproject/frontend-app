import React, { useState, useEffect } from "react";

// get confirmed bookings from microservice confirmedbookings
const ConfirmedBookings = () => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConfirmedBookings = async () => {
    try {
      const res = await fetch("https://localhost:7236/api/confirmation");
      if (res.ok) {
        const data = await res.json();
        setConfirmedBookings(data);
      } else {
        console.error("Failed to fetch confirmed bookings");
      }
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
    }
    setLoading(false);
  };
  // fetch all confirmed bookings at page laod
  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  return (
    <div>
      <h2>Recent Bookings</h2>

      {loading ? (
        <p>Loading recent bookings...</p>
      ) : confirmedBookings.length > 0 ? (
        <ul>
          {confirmedBookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.eventName}</strong> - {booking.userName} ({booking.userEmail})
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent bookings found.</p>
      )}
    </div>
  );
};

export default ConfirmedBookings;