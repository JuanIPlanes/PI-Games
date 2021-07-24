

/* eslint-disable import/no-anonymous-default-export */
import { FILTRES, REMOVE, SET } from './genres.actions'
const initialState = {
    list: [],
    filters: []
}

export default function Genres(state = initialState, { type, payload }) {
    switch (type) {
        case SET:
            return {
                ...state,
                list: payload
            }
        case FILTRES:
            return {
                ...state,
                filters: [...state.filters, payload]
            }
        case REMOVE:
            return {
                ...state,
                filters: state.filters.filter(fil => fil === payload)
            }
        default:
            return { ...state }
    }
}
