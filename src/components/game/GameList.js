import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGames, deleteGame } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const navigate = useNavigate()
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const getAllGames = () => {
        getGames().then(data => setGames(data))
    }

    const handleDelete = (id) => {
        deleteGame(id).then(() => {
            {getAllGames()}
             }) 
    }

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
        >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                handleDelete(game.id)
                        }}
                        >Delete Game</button>
                        {/* <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                navigate({ pathname: `/games/${game.id}/edit` })
                            }}
                        >Edit Game</button> */}
                    </section>
                    
                })
            }
        </article>
        </>     
    )
}