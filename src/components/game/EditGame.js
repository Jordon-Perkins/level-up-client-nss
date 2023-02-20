import { useState, useEffect } from "react"
import { useNavigate, useParams} from 'react-router-dom'
import { getGameTypes, getGame, updateGame } from '../../managers/GameManager.js'


export const EditGame = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: "",
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
        getGame(gameId).then(res => {
            setCurrentGame(res)
        })
    }, [])

    const changeGameState = (domGame) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[domGame.target.name] = domGame.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit this Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={(evt) => {const copy = {...currentGame}
                        copy.number_of_players = parseInt(evt.target.value)
                        setCurrentGame(copy)}}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select required autoFocus className="gameTypeList" value={currentGame.game_type}
                        onChange={(evt) => {const copy = {...currentGame}
                        copy.game_type = parseInt(evt.target.value)
                        setCurrentGame(copy)}}
                    ><option name="gameTypeId" className="gameType" >Select Game Type</option>
                        {gameTypes.map(gameType => {
                                return <option
                                    name="gameTypeId"
                                    className="form-control"
                                    value={gameType.id}
                                    key={`gameType--${gameType.id}`}
                                >{gameType.game_type}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    
                    updateGame(gameId, currentGame)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}