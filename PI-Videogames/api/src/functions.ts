// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
import axios from "axios"
const { API_KEY } = process.env,
{Genre, Videogame} = require("./db")

export async function getGenres():Promise<void> {
    axios
        .get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { responseType: 'json' })
        .then(({ data }) => data.results)
        .then(genres => genres.map(({ name=String }) => ({ name: name ?? "desconocido" })))
        //!geting names of genre from array of genres
        .then(async genreNames => await Genre.bulkCreate(genreNames))
        //!create all genres in d
}