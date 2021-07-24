


export const
    SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
    SET_NEXT_PAGE = 'SET_THE_NEXTPAGE_OF_VIDEOGAMES',
    SET_ORDER_FLOW = 'SET_FLOW_OF_ORDER',
    SET_ORDER_TYPE = 'SET_TYPE_OF_ORDER',
    CANONICAL = 'ORIGINAL_OR_CREATED',


    orderFlowButton = { type: SET_ORDER_FLOW },
    orderTypeButton = { type: SET_ORDER_TYPE };
//!factory
const actionFactory = (T, p) => ({ type: T, payload: p });

export const setNextPage = (page = '') => actionFactory(SET_NEXT_PAGE, page)
export const setPageNumber = (n = 1) => actionFactory(SET_PAGE_NUMBER, n)
export const canonicalAction = (canonical) => actionFactory(CANONICAL, canonical)