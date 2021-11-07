import {combineReducers} from 'redux'
import cartState from './cartReducer'
import itemState from './itemsReducer'
import imageReducer from './imageReducer'

const rootReducer = combineReducers({
        cart: cartState,
        itemsList: itemState,
        image: imageReducer
    })

export default rootReducer