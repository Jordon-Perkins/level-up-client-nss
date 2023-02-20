import { useState, useEffect } from "react"
import { useNavigate, useParams} from 'react-router-dom'
import { getEvent, updateEvent } from '../../managers/EventManager.js'
import { getGames } from '../../managers/GameManager.js'


export const EditEvent = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
        const [currentEvent, setCurrentEvent] = useState({
            date: "",
            time: "",
            description: "",
            organizer: {},
            game: {}
        })

        useEffect(() => {
            getGames().then(res => setGames(res))
            getEvent(eventId).then(res => {
                // get response from server then set value of key gameTypeId to pk int of game_type object
                res.gameId = res.game.id
                setCurrentEvent(res)
            })
        }, 
        [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <>
        <form className="eventForm">
            <h2 className="eventForm__title">Edit this Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game for the Event: </label>
                    <select required autoFocus className="gameList" value={currentEvent.game.id}
                        onChange={(evt) => {
                            const copy = {...currentEvent}
                            copy.game = parseInt(evt.target.value)
                            setCurrentEvent(copy)
                    }}
                    ><option name="gameId" className="game" >Select Game</option>
                        {games.map(game => {
                            // console.log(game)
                                return <option
                                    name="gameId"
                                    className="form-control"
                                    value={game.id}
                                    key={`game--${game.id}`}
                                //    selected = {game.id === currentEvent.gameId ? true : false}
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
                        value={currentEvent?.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time of the Event: </label>
                    <input type="text" name="time" placeholder="HH:MM" required autoFocus className="form-control"
                        value={currentEvent?.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of the Event: </label>
                    <input type="text" name="date" placeholder="YYYY-MM-DD" required autoFocus className="form-control"
                        value={currentEvent?.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    
                    updateEvent(eventId, currentEvent)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
        </>
    )
}