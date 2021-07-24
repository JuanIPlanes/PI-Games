


import { SET_PAGE_NUMBER, SET_ORDER_FLOW, SET_ORDER_TYPE, CANONICAL, NEXT } from './vg-options.action'
const initialState = {
    numpage: 1,
    next: '',
    orderDirection: false,   //? asc(true) |    desc(false)
    orderType: false,       //?alpha(true) |  rating(false)
    canonical: null        //? canon(true) | locals (false) | mixed(null)
}
export default function PokemonOptions(state = initialState, { type, payload }) {
    switch (type) {
        case SET_PAGE_NUMBER:
            return {
                ...state,
                numpage: payload
            }
        case NEXT:
            return {
                ...state,
                next: payload.next.length ? payload.next : state.next
            }
        case SET_ORDER_FLOW:
            return {
                ...state,
                orderDirection: !state.orderDirection
            }
        case SET_ORDER_TYPE:
            return {
                ...state,
                orderType: !state.orderType
            }
        case CANONICAL:
            return {
                ...state,
                canonical: payload
            }

        default:
            return { ...state }
    }
}