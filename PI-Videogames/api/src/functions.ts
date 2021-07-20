// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
import { Videogame, Genre } from "./db"
import axios from "axios"
const { API_KEY } = process.env


export async function getGenres():Promise<void> {
    axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { responseType: 'json' })
        .then(({ data }) => data.results)
        .then(genres => genres.map(genre => ({name:genre.name??"desconocido"}))) //!geting names of genre from array of genres
        .then(r => { console.log(r+"*******************************"); return r})
        .then(async genreNames=>await Genre.bulkCreate(genreNames)||alert(genreNames)) //!create all genres in db 
}

