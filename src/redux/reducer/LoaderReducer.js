import { LOADER } from '../action/Action'

const initialstate = { loader: false }

function LoaderReducer(state = initialstate, action) {
    switch (action.type) {
        case LOADER:
            return Object.assign({}, state, { loader: action.payload })
        default:
            return state
    }

}
export default LoaderReducer;