export const SET = 'SET_GENRES', FILTRES = "SET_FILTRES", REMOVE = "REMOVE_FILTRES";

export function setGenres(types) {
    return {
        type: SET,
        payload: types
    }
};
export function setFilters(name) {
    return {
        type: FILTRES,
        payload: name
    }
};
export function removeFilters(name) {
    return {
        type: REMOVE,
        payload: name
    }
};