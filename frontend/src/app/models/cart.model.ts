export interface AddCartItemRequest {
    itemId: number,
    quantity: number
}

export interface ModifyCartItemQuantityRequest {
    quantity: number
}

export interface CartInfo {
    id: number,
    UserId: number,
    total: number
}

export interface CartProduct {
    id: string,
    name: string,
    description: string,
    price: string,
    imageUrl: string,
    cartId: string,
    productId: string,
    quantity: number
}

export interface CartResponse {
    cartInfo: CartInfo,
    products: CartProduct[]
}
