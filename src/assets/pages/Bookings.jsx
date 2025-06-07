import React, { useState, useEffect } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch all bookings from the booking microservice
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
const [confirmationMessage, setConfirmationMessage] = useState("");

// Post all data to confirmed bookings microservice (buy the items in the shopping cart)
const handleConfirm = async () => {
  if (!name || !email) {
    alert("Please enter both name and email.");
    return;
  }

  const confirmationRequest = { name, email };

  try {
    const res = await fetch("https://localhost:7236/api/confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(confirmationRequest),
    });

    if (res.ok) {
if (res.ok) {
  setConfirmationMessage("Your booking is confirmed!");
  setBookings([]); // Clear bookings after confirmation
  fetchBookings(); // Reload data
}
    } else {
      setConfirmationMessage("Failed to confirm bookings.");
    }
  } catch (error) {
    console.error("Error confirming bookings:", error);
    setConfirmationMessage("Something went wrong.");
  }
};
 // fetch all bookings at pageload
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <p>Please confirm your bookings to add them as confirmed (they will then show as recent bookings on Dashboard page)</p>

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

      {/* Input fields for name and emaill */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleConfirm}>Confirm Booking(s)</button>
        {confirmationMessage && <p style={{ color: "green", marginTop: "10px" }}>{confirmationMessage}</p>}
      </div>
    </div>
  );
};

export default Bookings;