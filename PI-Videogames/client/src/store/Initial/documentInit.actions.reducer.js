


const LOAD = ["LOADING", "LOADED"]
export const Loaded = { type: LOAD[1] }
export const Loading = { type: LOAD[0] }
//! loading (true)  |  loaded (false)
export default function LoadedPage(state = { load: true }, action) {
    switch (action.type) {
        case LOAD[0]:
            return {
                ...state,
                load: true
            }
        case LOAD[1]:
            return {
                ...state,
                load: false
            }
        default:
            return {
                ...state
            }
    }
}