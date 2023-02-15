import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.game.title} organized by {event.organizer.full_name}</div>
                        <div className="event__attendees">{event.attendees} who is playing</div>
                        <div className="event__description"> {event.description}</div>
                        <div className="event__dateAndTime"> {event.date} {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}