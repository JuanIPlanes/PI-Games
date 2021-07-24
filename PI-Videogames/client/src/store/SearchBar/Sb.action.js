

export const IS = 'INIT_SEARCH',
    SF = 'SEARCH_FALIED',
    SC = 'SEARCH_COMPLETED'

export const search = {
    type: IS
}

export const unsuccessful = {
    type: SF
}

export function succesful(data) {
    return {
        type: SC,
        payload: data
    }
}