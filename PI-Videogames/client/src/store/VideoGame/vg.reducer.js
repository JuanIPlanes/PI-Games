


import {
    GET_ALL, SET_ORGANIZED,
    SET_PER_PAGE, SET_FILTERED,
    SWITCH_ORDER_UNORDER
} from "./vg.actions"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    unorganized: [],      //all Videogame    unordered
    organized: [],       //organizedBy        ordered
    filtred: [],         //ord/unord filtered
    listToShow: false, //unordered(false)/ordered(true) //?pointer
    perPage: [],      //12 videogames / page
}

export default function allPokemons(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL:
            return {
                ...state,
                unorganized: [...state.unorganized, ...payload],
            }
        case SET_ORGANIZED:
            return {
                ...state,
                organized: payload
            }
        case SET_FILTERED:
            return {
                ...state,
                filtered: payload
            }
        case SWITCH_ORDER_UNORDER:
            return {
                ...state,
                listToShow: !state.listToShow
            }
        case SET_PER_PAGE:
            return {
                ...state,
                perPage: payload
            }
        default:
            return {
                ...state
            }
    }
}