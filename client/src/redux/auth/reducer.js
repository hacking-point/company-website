import {ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS} from "./actionType"
const init={
    isLoading:false,
    isError:false,
    token:"",
    isAuth:false,
    data:{}
}

export const authReducer=(store=init,{type,payload})=>{
    console.log(payload)
    switch(type){
        case ADD_REGISTER_REQUEST:
            return {...store,isLoading:true}
        case ADD_REGISTER_SUCCESS:
            return {...store,isLoading:false,data:payload}
        case ADD_REGISTER_FAILURE:
            return {...store,isError:payload.message}
        default:
            return {...store}
    }

}