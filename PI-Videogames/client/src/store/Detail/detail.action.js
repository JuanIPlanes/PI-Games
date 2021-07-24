export const DETAILS = "VIDEOGAME_DETAILED", NOT_FOUND = "NOT_FOUND",
    notFound = { type: NOT_FOUND },
    sendDetails = (data) => ({ type: DETAILS, payload: data })