export type ItemType = {
    _id: string,
    brand?: string,
    label: string,
    size: string,
    color: string,
    fit: string,
    occasion: string,
    imageUrl: string,
    price: number,
    discount: number,
    rating: number
}
export type CartStateType = {
    id: string,
    quantity: number,
    size: string,
    fit ?: string
}

export type ItemsList = {
    similar: ItemType[],
    matching: ItemType[]
}