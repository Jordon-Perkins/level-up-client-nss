import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent,} from '../../managers/EventManager.js'
import { getGames } from '../../managers/GameManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [gameId, setGameId] = useState([])


        // Since the input fields are bound to the values of
        // the properties of this state variable, you need to
        // provide some default values.
    const [currentEvent, setCurrentEvent] = useState({
        date: "",
        time: "",
        description: "",
        organizer: 0,
        gameId: 0
    })

    useEffect(() => {
        // TODO: Get the game, then set the state
        getGames().then((data) => {
            // console.log(data)
            setGameId(data)
        })
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game for the Event: </label>
                    <select required autoFocus className="gameList" value={currentEvent.gameId}
                        onChange={(evt) => {const copy = {...currentEvent}
                        copy.gameId = parseInt(evt.target.value)
                        setCurrentEvent(copy)}}
                    ><option name="gameId" className="game" >Select Game</option>
                        {gameId.map(game => {
                            // console.log(game)
                                return <option
                                    name="gameId"
                                    className="form-control"
                                    value={game.id}
                                    key={`game--${game.id}`}
                                >{game.title}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description of the Event: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time of the Event: </label>
                    <input type="text" name="time" placeholder="HH:MM" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of the Event: </label>
                    <input type="text" name="date" placeholder="YYYY-MM-DD" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        time: currentEvent.time,
                        date: currentEvent.date,
                        organizer: localStorage.getItem("lu_token"),
                        gameId: parseInt(currentEvent.gameId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}