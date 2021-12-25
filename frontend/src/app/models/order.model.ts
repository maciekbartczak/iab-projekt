export interface CreateOrderRequest {
    cartId: number,
    addressId: number
}

export interface Order {
    id: number,
    UserId: number,
    addressId: number,
    paymentId: number,
    statusId: number,
    total: number,
    placedAt: Date
}

export interface OrderItem {
    id: number,
    orderId: number,
    productId: number,
    price: number,
    quantity: number,
    name: string
    imageUrl: string
}

export interface OrderInfo {
    order: Order,
    items: OrderItem[];
}
