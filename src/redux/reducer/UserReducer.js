import { actionTypes } from "../action/types";

const initial = {
    infor: null,
    check: -999
}
const UserReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            state.check = action.payload
            return {...state}  
        case actionTypes.SIGN_OUT: 
        state.check = -999;
        return {...state}  
        default:
            return {...state}
    }
}
export default UserReducer;