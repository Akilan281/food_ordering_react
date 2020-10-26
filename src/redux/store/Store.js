import {createStore, combineReducers} from 'redux'
import HomeReducer from '../reducer/HomeReducer'
import LoaderReducer from '../reducer/LoaderReducer'
const appReducer= combineReducers(
    {
        HomeReducer,
        LoaderReducer
    }
)
const rootReducer=(state,action)=>{
    return appReducer(state, action)

}


const Store = createStore( rootReducer,{})

export default Store;