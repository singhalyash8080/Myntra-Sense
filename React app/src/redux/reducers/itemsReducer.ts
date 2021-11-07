import { ItemsList } from "../../common/types"


const initialState : ItemsList | {} = {similar: [], matching: []}


const modifyItems = (state:any, props :any) => {
    const {matchType, itemList} = props
    switch(matchType){
        case 'SIMILAR' : return {matching : [...state.matching], similar:[...itemList]}
        case 'MATCHED' : return {similar : [...state.similar], matching:[...itemList]}
        default: return (state)

    }

}


const itemsReducer = (state = initialState, action : any) => {
    console.log("state",state);
    
    switch(action.type)
    {
        case 'ADD_ITEM_LIST': return modifyItems(state,action)
        default: return {...state}
    }
}
export default itemsReducer