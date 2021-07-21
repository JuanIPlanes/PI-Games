// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
import axios, { AxiosPromise, AxiosResponse } from "axios"
const { API_KEY } = process.env,
GAMES_AT_DATE = 586489; //586489 is amount of games in External_Api to Date (21/7/21)
    // const { API_KEY, games_ext_api_count } = process.env

const { Genre, Videogame } = require("./db.js")


export async function getGenres():Promise<void> {
    axios
        .get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { responseType: 'json' })
        .then(({ data }) => data.results)
        .then(genres => genres.map(({ name=String }) => ({ name: name ?? "desconocido" })))
        //!geting names of genre from array of genres
        .then(async genreNames => await Genre.bulkCreate(genreNames))
        //!create all genres in db
}

async function getGames() {
    let ref = undefined;
    axios
        .get(`https://api.rawg.io/api/games?key=${API_KEY}`, { responseType: 'json' })
        .then(({ data }) =>((ref=data.results)&&data.results))
        .then()
}
type Messages = {
    "invalid": string,
    "notFound":string
}
type Msg = {
    msg:string
}
export const msgs: Messages = {
    invalid: "el ID introducido no existe",
    notFound: "ID No Encontrado"
}
export const msg = (r:string) => ({msg: Object.getOwnPropertyDescriptor(msgs,r)?.value});
function transformDataRecived(game: object) {
    const LIST = [
        'background_image', 'background_image_additional', 'name name_original', 'alternative_names', 'genres', 'description', 'description_raw', 'released updated', 'rating', 'rating_top', 'ratings', 'platform'
    ]
    
    return Object.fromEntries(
        Object
            .entries(game)
            .filter((prop: Array<any>) =>
            LIST.includes(prop[0])
        ))
}
export async function getById(id: number): Promise<object> {
    return id > 1000000
        ? await Videogame.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			include: {
				model: Genre,
				attributes: ['name', "id"],
				through: {
					attributes: []
				}
			}
		}) ?? msg("notFound")

        : id < GAMES_AT_DATE || id > 0
            ? await axios
                .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, { responseType: 'json' })
                .then(({ data }: AxiosResponse) =>
            data.hasOwnProperty("detail")
                ? msg("invalid")
                : transformDataRecived(data)
            ).catch(error => {
                console.log(msg("invalid"))
                return ({
                    error: error.message,
                    msg: msg("invalid").msg
                })
            })
            : msg("invalid")
        }