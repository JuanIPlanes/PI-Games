// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
import axios, { AxiosPromise, AxiosResponse } from "axios"
import { OptionsUrlencoded } from "body-parser";
import { Op } from "sequelize"
const { API_KEY } = process.env,
GAMES_AT_DATE = 586489; //586489 is amount of games in External_Api to Date (21/7/21)
    // const { API_KEY, games_ext_api_count } = process.env

const { Genre, Videogame } = require("./db.js")
type Messages = {
    "invalid": string,
    "notFound": string,
    "incorrect": string,
    "empty": string,
    "gettingByName": string
}
type Msg = {
    msg:string
}
// export const msgs_en: Messages = { }
// export const msgs_es: Messages_es = {
export const msgs: Messages = {
    invalid: "el ID introducido no existe.",
    notFound: "ID No Encontrado.",
    incorrect: "Los datos enviados son incorrectos. Por favor, revíselos.",
    empty: "Introduca los Datos Requeridos.",
    gettingByName: "Error al obtener la lista de juegos. Intente nuevamente o contacte al soporte técnico."

} as const;

export const msg = (r:string, lang?:string) => ({msg: Object.getOwnPropertyDescriptor(msgs,r)?.value});

export async function getGenres():Promise<void> {
    axios
        .get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { responseType: 'json' })
        .then(({ data }) => data.results)
        .then(genres => genres.map(({ name=String }) => ({ name: name ?? "desconocido" })))
        //!geting names of genre from array of genres
        .then(async genreNames => await Genre.bulkCreate(genreNames))
        //!create all genres in db
}

export interface Params {
    offset: number,
    order?: or,
    by?: by
}
export type or = "ASC" | "DESC"
export type by = "name"|"rating"
interface ExtParams  {
    id: number,
    name: string,
    background_image_additional:string,
    background_image: string,
    genres: Array<object>,
    rating: number
}
const Order = {
    DESC: [-1, 0, 1],
    ASC: [1, 0, -1]
}

export async function getGames({ offset = 0, order = "ASC", by = "name" }: Params, next?: string) {
    const url = next===undefined
        ? `https://api.rawg.io/api/games?key=${API_KEY}`
        : next.toString()
        console.log(url)
    try{
        let ext = await axios
            .get(url, { responseType: 'json' })
            .then(({ data }) => ({results:data.results, nextLink:data.next}))
            .then(({ results, nextLink }) => ({
                results: results.map((
                    { id, name, background_image: imageURL,
                        background_image_additional: imageURL_a, genres, rating }:ExtParams) =>
                    ({ id, name, imageURL, imageURL_a, rating, genres:genres.map(({id, name})=>({id, name})) })),
                next:nextLink
            }))
            .catch((e: Error) => { throw { err: e, inExt: true } });
        let { rows: locals } = await Videogame.findAndCountAll({
            limit: 15,
            offset,
            orderBy: [by, order],
            attributes: ["name", "id", "imageURL", "rating"],
            through: { attributes: [] },
            include: {
                model: Genre,
                attributes: ["name", "id"],
                through: { attributes: [] }
            }
        }).catch((e: Error) => { throw { err: e, inLocal: true } });
            console.log("-------------------**/--")
        return {
            next: ext.next,
            results: [...ext.results, ...locals]
                .sort(({ name: name1, rating: rating1 }, { name: name2, rating: rating2 }) => {
                    return by === "rating"
                        ? rating1 > rating2 ? Order[order][0] : rating1 === rating2 ? Order[order][1] : Order[order][2]
                        : name1.localeCompare(name2) * (order === "ASC" ? 1 : -1)
                })
                // .map((e: object) => delete e.rating && e)
        }
    }catch (err:any) {
        console.log(err)
        return {
            msg: msg("gettingByName"),
            error: err
        }
    }
}

export function arrayChecker(arr: string[]) {
    return !(
        Array.isArray(arr) && arr.length &&
        arr.every((str: any) =>
            typeof (str) === "string" && str.length > 1 && str.length < 30)
    )
}

export function dateChecker(str:string) {
    return (str.length >= 10 &&
        Number.isNaN(Date.parse(str)))
}

export function dateParser(str:string) {
    return str.length >= 10 &&
            !Number.isNaN(Date.parse(str))
        ? new Date(str)
        .toUTCString() //transforming format to "yyyy-mm-ddThh-min-sc.mscZ"
            .slice(5, 16) //extracting only y-m-d
        : false
}

function transformGameRecived(game: object) {
    const LIST = [
        'background_image', 'background_image_additional', 'name', 'name_original', 'alternative_names', 'genres', 'description', 'description_raw', 'released', 'updated', 'rating', 'rating_top', 'ratings', 'platform'
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

        : id < GAMES_AT_DATE && id > 0
            ? await axios
                .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, { responseType: 'json' })
                .then(({ data }: AxiosResponse) =>
            data.hasOwnProperty("detail")
                ? msg("invalid")
                : transformGameRecived(data)
            ).catch(error => {
                console.log(msg("invalid"))
                return ({
                    error: error.message,
                    msg: msg("invalid").msg
                })
            })
            : msg("invalid")
}
        
export async function getByName(name:string) {
    try {
        let { rows: locals } = await Videogame.findAndCountAll({
			limit: 15,
            where: name.length
                ? {
				name: { [Op.iLike]: `%${name}%` }
                }
                : {},
			attributes: {
				exclude: ["createdAt", "updatedAt"]
			},
			include: {
				model: Genre,
				attributes: {include:["name", "id"]},
				through: { attributes: [] }
			}
        }).catch((e:Error)=>{throw {err:e, inLocal:true}}),
        external = await axios
            .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`, {responseType:"json"})
            .then(({ data }) => data.results.slice(0, 14))
            .catch((e:Error)=>{throw {err:e, inExt:true}})
        return {l:locals, e: external}
    } catch (err:any) {
        console.log(err)
        return {
            msg: msg("gettingByName"),
            error: new Error(err.err).message
        }
    }
}

export interface Props {
    name: string,
    description: string,
    platform: Array<string>,
    releaseDate: string,
    rating: number,
    imageURL: string
}

export async function createGame(props:Props, genres:string[]) {
    const { name, description,
        releaseDate, rating, platform, imageURL }:Props = props,
        GENRES:Promise<Promise<object>>[] = [];
		// try {
    const [VIDEOGAME, VGCreated] = await Videogame.findOrCreate({
        where: { name },
        defaults: {
            name,
            description,
            platform,
            imageURL,
            releaseDate: dateParser(releaseDate) ? new Date(releaseDate) : null,
            rating: parseFloat(rating) ?? null 
        },
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
    }).catch((e:Error) => { throw e });
            if (!VGCreated) return { created:VGCreated, game: VIDEOGAME };
    genres.forEach((genre:string) => {
        GENRES.push(
            Genre
                .findOrCreate({
			where: { name: genre },
			defaults: { name: genre },
			attributes: {
				exclude: ["createdAt", "updatedAt"]
			},
                })
                .then(async (findedOrCreated) => {
                    await VIDEOGAME.addGenre(findedOrCreated[0])
                    let ts:object = findedOrCreated[0].dataValues
                    delete ts.createdAt
                    delete ts.updatedAt
                    return ts
		            })
                .catch((err: any) => {throw err})
				)
			})
    return await Promise.all(GENRES)
        .then((r)=>{            
            let vgToSend:object = { ...VIDEOGAME.dataValues, genres:r??null, created: VGCreated };
			delete vgToSend.createdAt;
			delete vgToSend.updatedAt;
			return vgToSend
        })
        .catch((e: any) => { throw e })
            // } catch (e:any) {
		// 	return {a:e,b:"1"}
		// }
	}

    //!?!?!traeme la copa MESSI