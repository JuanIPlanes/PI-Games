


export const
    GET_ALL = 'GET_VIDEOGAMES',
    SET_ORGANIZED = 'ORDERED_LIST_OF_VIDEOGAMES',
    SET_FILTERED = 'FILTERED_LIST_OF_VIDEOGAMES',
    SWITCH_ORDER_UNORDER = 'SET_ORGANIZED-UNORGANIZED_MODE',
    SET_PER_PAGE = "VIDEOGAMES_PER_PAGE",


    organizeList = { type: SWITCH_ORDER_UNORDER };
//!factory
const actionFactory = (T, p) => ({ type: T, payload: p instanceof Array ? p : [p] });
//? factorys
const getVideoGames = (results) => actionFactory(GET_ALL, results ?? []);
export default getVideoGames;
export const orderedVideoGames = (vg) => actionFactory(SET_ORGANIZED, vg)
export const filteredVideoGames = (vg) => actionFactory(SET_FILTERED, vg)
export const perPage = (vgs) => actionFactory(SET_PER_PAGE, vgs)