import { NOT_FOUND, DETAILS } from "./detail.action"

const initialState = {
    finded: false,
    videogame: {
        id: "",
        name: "",
        description: "",
        platform: [],
        rating: "",
        releaseDate: "",
        genres: []
    }
}
let DetailReducer
export default DetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case DETAILS:
            return { finded: true, pokemon: { ...state, ...payload } }
        case NOT_FOUND:
            return { ...initialState }
        default:
            return state
    }
}
