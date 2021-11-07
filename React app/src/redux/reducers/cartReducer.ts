import { CartStateType } from "../../common/types";

const modifyItem = (state : CartStateType[], props : any) =>{
    const {itemid, change} = props
    const index = state.findIndex(({id : idx}) => idx === itemid)
    const newQuantity = state[index].quantity + change ;
    let newState = state;
    newQuantity !== 0
        ? newState[index] = {...newState[index],quantity: newQuantity} 
        : newState.splice(index,1)
    return ([...newState]);
}
const addItem = (state:CartStateType[], props : any) => {
    const {id, size} = props
    const idx = state.findIndex(item =>  item.id === id)
    let newState = state
    if(idx === -1)
        newState.push({id: id, quantity: 1,size: size, fit:'slim'})
    else
        newState[idx].quantity += 1
    
    return newState
}
const initialState: CartStateType[] = []

const cartReducer = (state = initialState, action : any) => {
    switch (action.type){
        case "ADD_ITEM" : return addItem(state, action)
        case "MODIFY_ITEM" : return modifyItem(state, action)
        default : return state
    }
}
export default cartReducer