const INIT = 'LOADED', LOADING = 'LOADING'
export const LOADED = { type: INIT }
export const LOAD = { type: LOADING }

export default function LoadedPage(state = { loaded: false, loading: false }, action) {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                loaded: true
            }
        case LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        default:
            return {
                ...state
            }
    }
}