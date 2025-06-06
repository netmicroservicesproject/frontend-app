import React, { useState, useEffect } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings from the backend
  const fetchBookings = async () => {
    try {
      const res = await fetch("https://localhost:7235/api/booking");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setLoading(false);
  };

  // Load bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.name}</strong>: {booking.information}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;