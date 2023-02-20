import React, { useEffect, useState } from "react"
import { getEvents, deleteEvent } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const getAllEvents = () => {
        getEvents().then(data => setEvents(data))
    }

    const handleDelete = (id) => {
        deleteEvent(id).then(() => {
            {getAllEvents()}
             }) 
    }

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event?.game?.title} organized by {event?.organizer?.full_name}</div>
                        <div className="event__attendees">{event.attendees} who is playing</div>
                        <div className="event__description"> {event.description}</div>
                        <div className="event__dateAndTime"> {event.date} {event.time}</div>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                handleDelete(event.id)
                        }}
                        >Delete Event</button>
                    </section>
                })
            }
        </article>
        </>
    )
}