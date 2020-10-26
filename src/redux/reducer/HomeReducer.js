import { act } from "@testing-library/react"
import {HOME_LIST} from "../action/Action"

const initialstate = {
    homelist:[]
}


const HomeReducer = (state=initialstate, action)=> {
    console.log("stateaction",action)
switch(action.type){
    case HOME_LIST :
        return Object.assign([], {homelist:action.payload})
        default:
        return state
}
}

export default HomeReducer;