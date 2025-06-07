import React from 'react'
import EventCard from '../components/EventCard'
import { useState, useEffect } from "react";

const Events = () => {
    const [events, setEvents] = useState([])

    // fetches events from database in events microseervice
    const getEvents = async () => {
        const res = await fetch("https://microprojectevents.azurewebsites.net/api/events")
        if (res.ok){
            const data = await res.json()
            setEvents(data)
        } else {
            console.log("something went wrong")
        }
    }
    useEffect(() => { // Get all events at pageload
        getEvents()
    })
  return (
    <div className='eventCards'>
        {/* <h2>Events</h2> */}
        {
            events.map(event => ( // Map out all events with the card component
                <EventCard key={event.id} event={event}></EventCard>
            ))
        }

    </div>
  )
}

export default Events