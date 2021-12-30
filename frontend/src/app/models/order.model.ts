export interface CreateOrderRequest {
    cartId: number,
    addressId: number
}

export interface Order {
    id: number,
    addressId: number,
    orderStatus: OrderStatus,
    paymentType: string,
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

export type OrderStatus = 'new' | 'processing' | 'in_shipping' | 'finished';
