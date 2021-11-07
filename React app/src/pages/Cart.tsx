import React from 'react'
import { useSelector } from 'react-redux'
function Cart() {
    const cartState = useSelector((state: any) => state.cart)
    const itemList = useSelector((state: any) => state.itemsList)
    const cartItems = cartState.map((item: any) => {
        const newItem = itemList.find((matchItem: any) => matchItem._id === item.id)
        return {
            image: newItem.image,
            brand: newItem.brand,
            label: newItem.label,
            quantity: item.quantity,
            price: newItem.price
        }
    })
    return (
        <div>
            {JSON.stringify(cartItems)}
        </div>
    )
}

export default Cart
