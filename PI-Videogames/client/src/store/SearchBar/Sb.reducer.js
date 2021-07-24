

import { IS, SC, SF } from "./Sb.action"

const initialState = {
    loading: false,
    videogame: {},
    msg: ''
}
export default function searchBar(state = initialState, { type, payload }) {
    switch (type) {
        case IS:
            return {
                ...initialState,
                loading: true
            }
        case SC: return {
            loading: false,
            videogame: payload,
            msg: ''
        }
        case SF:
            return {
                ...state,
                loading: false,
                videogame: {},
                msg: 'No se encontraron resultados a la busqueda.'
            }
        default:
            return { ...state }
    }
}


